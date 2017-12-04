const multer = require('multer');
const path = require('path');

module.exports ={
    
    //file name and file destination folder
	storage : multer.diskStorage({
				destination: (req, file, cb)=>cb(null, __dirname+'/../../public/avatars'),
				filename: (req, file, cb)=> cb(null, Date.now() + '-' + file.originalname),
			}),

	fileFilter :(req, file, cb)=>{

		const filetypes = /jpeg|jpg|png|gif/;
	    const mimetype = filetypes.test(file.mimetype);
	    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        //Considering both mimetype and extention, to prevent other types of file and protecting system from malwares
	    if (!mimetype && !extname) {
	    	req.fileValidationError = 'Only image files are allowed!';
	    	return cb(null, false, new Error("File upload only supports the images")); //Error handling needs to be solved and tested again, don't worry formidable comes next and it has the same issue here
	    }

	    cb(null, true);
	}
}


 // const upload = multer({storage: multerOpts.storage, 
 //                          fileFilter: multerOpts.fileFilter, 
 //                          limits: {fileSize: 1 000000}}) //Check the filesize to avoid malicious
 //                          .single('avatar');

 //    upload(req, res, (err)=>{
 //        if(req.fileValidationError){
 //            res.send(req.fileValidationError);
 //        }else{
 //            res.send('File is uploaded');
 //            //res.redirect('/user/profile_edit/'+req.params.id);
 //        }
        
 //    });



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
		
		var size = req.headers['content-length'];
	    
        req.on('data', (data)=>{
        	size += data.length;
        	console.log(size);
        }); 
        if(size < 1000000){
        	form.parse(req, ()=>{
			      res.send('Uploaded');              
			}); 
        }





        // var closeConnection = function(res, form){
//     try{
//     if (!res.ended){
//         form.onPart=null;
//         form.pause();
//         res.end();
//         res.ended = true;
//     }
//     }catch(e){console.log(e);}
// }



// app.use ( function( req, res, next) {
//     if (req.method == 'GET') {
//       req.body = req.files = {};
//       next();
//     } else {
//       var form = new multiparty.Form({
//         autoFields: true,
//         autoFiles: true,
//         hash: 'sha256',
//         uploadDir: file_store.getTmpDir()
//       });

//       form.parse(req, function (err, fields, files) {
//         if (err) {
//           next(err);
//         } else {
//           req.body = fields || {};
//           for (var field in req.body) {
//             if (req.body[field].length == 1) req.body[field] = req.body[field][0];
//           }
//           req.files = files || {};
//           next();
//         }
//       });
//     }
//   });


//app.use(multiparty);

// router.post('/upload/:id', multiparty,(req, res, next)=>{
//     var name;
//     console.log(req.filename);
//     // req.on('end', ()=>{
//     // 	name = req.filename;
//     // 	console.log(name);

//     // }); 
//     //next();
//     res.send('File uploaded');    
// });