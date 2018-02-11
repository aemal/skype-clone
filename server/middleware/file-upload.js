'use strict';

const multiparty = require('multiparty');
const fs = require('fs');
const qs = require('qs');
const uuidv1 = require('uuid/v1');

function incomingForm(req, res, next) {
	let data = {};
	let count = 0; 

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

    const form = new multiparty.Form();
    form.uploadDir = __dirname + '/../../public/images/avatars';
    form.maxFieldsSize = 1 * 1024 * 1024; // Memory size
    form.maxFilesSize = 1 * 1024 * 1024;

    form.on('error', (err)=>{
        //res.header('Connection', 'close');
        if(req.filename){
        	fs.unlink(`${form.uploadDir}/${req.filename}`, err=>{if(err) return netx(err);});
        }
        next(err);
    });
    
    form.on('field', (name, val)=>{
      ondata(name, val, data);
    });

    //Parts are emitted when parsing the form
    form.on('part', (part)=>{
        const type = part.headers['content-type'];
        const size = part.byteCount - part.byteOffset;
        count++;
        if(count>1){
        	form.emit('error', new Error('Only one file is allowed...'));
            part.resume();
            return;
        };

        if (part.filename && type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png' || type === 'image/gif') {
            const mimeType = type.substring('6');
            const name = uuidv1() + '-' + Date.now() + '.' + mimeType;
            const path = form.uploadDir + "/" + name;
            req.filename = name;
            part.pipe(fs.createWriteStream(path));

            if (size > form.maxFilesSize) {
                form.emit('error', new Error('File size is bigger than 1MB...'));
                part.resume();
                return;
            }

        } else {
            form.emit('error', new Error('Only image files are allowed...'));
            part.resume();
            return;
        }

        part.on('error',(err)=>form.emit(err));

    });

    form.on('progress', (bytesReceived, bytesExpected) => {
        const percent = (bytesReceived / bytesExpected * 100) | 0;
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
