const formidable = require('formidable');

function incomingForm(req, res, next){

   var form = new formidable.IncomingForm();
    //File destination ...
	form.uploadDir = __dirname + '/../../public/avatars';

    form.on('field', (field, value)=>{
        })
        .on ('fileBegin', (name, file)=>{

			if(file.name !== ''){

				var fileType = file.type.split('/').pop();

	            if(fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' ){

	                //rename the incoming file
	                file.path = form.uploadDir + "/" + req.params.id  + '_' + Date.now() +'-'+ file.name ;
	            } else {
	                console.log( 'incorrect file type: ' + fileType );
	                form.emit('error', new Error('Only image files are allowed...'));
	            }
			}else{
				res.send('No file is chosen');
			}
        }).on('file', (field, file)=>{
            //on file received
            if(file.size > 1000000){
                form.emit('error', new Error('File size is bigger than 1MB...'));
            } 
		}).on('progress', (bytesReceived, bytesExpected)=>{
            var percent = (bytesReceived / bytesExpected * 100) | 0;
            process.stdout.write('Uploading: %' + percent + '\r');
            console.log();
	    })
	    .on('end', ()=>{
            console.log('-> upload done');
            res.send('Uploaded');
	    }).on('error', (err)=>{
		    throw err;
		    next(err);	
		}).parse(req);   		
};

module.exports = incomingForm;


