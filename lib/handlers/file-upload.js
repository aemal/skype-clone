const formidable = require('formidable');


function incomingForm(req, res, next){

   var form = new formidable.IncomingForm();
   var big= false;
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
	                form.on('file', (field, file)=>{
				            //on file received
				            if(file.size > 1000000){
				            	console.log(file.size);
				                big = true;
				                //console.log(big);
				                form.emit('error', new Error('File size is bigger than 1MB...'));
				            }else{
				            	big = false;
				            	form.on('progress', (bytesReceived, bytesExpected)=>{
						            var percent = (bytesReceived / bytesExpected * 100) | 0;
						            process.stdout.write('Uploading: %' + percent + '\r');
						            console.log();
							    })
							    .on('end', ()=>{
						            console.log('-> upload done');
						            //res.send('Uploaded');
							    });
				            }
						});

	            } else {
	                console.log( 'incorrect file type: ' + fileType );
	                form.emit('error', new Error('Only image files are allowed...'));
	            }
			}else{
				res.send('No file is chosen');
			}
        })
       .on('error', (err)=>{
		    //console.log(err.message);
			res.header('Connection', 'close');
		    res.status(400).send('Failed');
		   // throw err;
			next(err);
		});
		// console.log(req.headers['content-length']);
	 //    var size = 0;
  //       req.on('data', (data)=>{
  //       	size += data.length;
  //       	console.log(size);
  //       }); 
        console.log(big); 
        if(big === false){
        	form.parse(req, ()=>{
			      res.send('Uploaded');              
			}); 
        }
        	
};

module.exports = incomingForm;


  //    form.on('part', (part)=>{
  //       	console.log('hi');
		//   if (!part.filename || /\.(gif|jpe?g|png)$/i.test(part.filename)) {
		//   	form.emit('error', new Error('File upload canceled by the server.'));
		//     return part.pipe(fs.createWriteStream('/dev/null'));
		//   }else{
               
		//   }
		// })