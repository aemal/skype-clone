const multiparty = require('multiparty');
const fs = require('fs');
const qs = require('qs');
const uuidv1 = require('uuid/v1');

function incomingForm(req, res, next) {
	var data = {};

	if (req._body) return next();
    req.body = req.body || {};

    // ignore GET
    if ('GET' === req.method || 'HEAD' === req.method) return next();

    function ondata(name, val, data){
      if (Array.isArray(data[name])) {
        data[name].push(val);
      } else if (data[name]) {
        data[name] = [data[name], val];
      } else {
        data[name] = val;
      }
    };

    // flag as parsed
    req._body = true;

    var name = '';
    var form = new multiparty.Form();
    form.uploadDir = __dirname + '/../../public/avatars';
    form.maxFieldsSize = 1 * 1024 * 1024; // Memory size
    form.maxFilesSize = 1 * 1024 * 1024;

    form.on('error', (err) => {
        res.header('Connection', 'close');
        res.status(413).send(err.message);
        next(err);
    });
    
    form.on('field', (name, val)=>{
      ondata(name, val, data);
    });

    //Parts are emitted when parsing the form
    form.on('part', (part)=>{

        var type = part.headers['content-type'];
        var size = part.byteCount - part.byteOffset;

        if (part.filename && type === 'image/jpeg' || type === 'image/png' || type === 'image/gif') {

            name = uuidv1() + '_' + Date.now() + '-' + part.filename;
            var path = form.uploadDir + "/" + name;
            req.filename = name;
            part.pipe(fs.createWriteStream(path));

            if (size > form.maxFilesSize) {
                form.emit('error', new Error('File size is bigger than 1MB...'));
                part.pipe(fs.createWriteStream('/dev/null'));
                part.resume();
                return;
            }

        } else {
            form.emit('error', new Error('Only image files are allowed...'));
            part.pipe(fs.createWriteStream('/dev/null'));
            part.resume();
            return;
        }

        part.on('error',(err)=>form.emit(err));

    });

    form.on('progress', (bytesReceived, bytesExpected) => {
        var percent = (bytesReceived / bytesExpected * 100) | 0;
        process.stdout.write('Uploading: %' + percent + '\r');
        console.log();
    });

    form.on('close', () => {
    	try {
	        req.body = qs.parse(data, { allowDots: true })
	        next();
        } catch (err) {
	        err.status = 400;
	        next(err);
        }       
    });
    form.parse(req);
};

module.exports = incomingForm;
