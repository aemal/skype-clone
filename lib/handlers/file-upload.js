const multiparty = require('multiparty');
const formidable = require('formidable');
const uuidv1 = require('uuid/v1');
const fs = require('fs');


function incomingForm(req, res, next){
	var name = '';

    var form = new multiparty.Form();
    form.uploadDir = __dirname + '/../../public/avatars';
    form.maxFieldsSize = 1*1024*1024; // Memory size 
    form.maxFilesSize= 1*1024*1024;

	form.on('error', (err)=>{
	  res.status(413).send(err.message);
	  next(err);
	});
	
    //Parts are emitted when parsing the form
	form.on('part', function(part) {
	    var type = part.headers['content-type'];
	    var size = part.byteCount - part.byteOffset;

        if(part.filename && type === 'image/jpeg' || type === 'image/png' || type === 'image/gif'){
        	name = uuidv1() + '_' + Date.now() +'-'+ part.filename;
            var path = form.uploadDir + "/" + name ;
            part.pipe(fs.createWriteStream(path));

            if(size > form.maxFilesSize){
            	form.emit('error', new Error('File size is bigger than 1MB...'));
        	    part.resume();
        	    return;
            }

        }else{
        	form.emit('error', new Error('Only image files are allowed...'));
        	part.resume();
        	return;
        }

	    part.on('error', function(err) {
	      form.emit(err)
	    });

	});

    form.on('progress', (bytesReceived, bytesExpected)=>{

    	if(bytesReceived === 44  && bytesExpected === 44){
    		form.emit('error', new Error('No file is chosen...'));
    	}

        var percent = (bytesReceived / bytesExpected * 100) | 0;
        process.stdout.write('Uploading: %' + percent + '\r');
        console.log();
	}).on('close', ()=>{
	  res.send('File Uploaded');
	});
   
    form.parse(req);
    console.log(name);
    return name;       	
};

module.exports = incomingForm;

