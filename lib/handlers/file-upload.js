const multer = require('multer');
const path = require('path');

module.exports ={
    
    //file name and file destination folder
	storage : multer.diskStorage({
				destination: (req, file, cb)=>cb(null, __dirname),
				filename: (req, file, cb)=> cb(null, Date.now() + '-' + file.originalname),
			}),

	fileFilter :(req, file, cb)=>{
		console.log(file);
		const filetypes = /jpeg|jpg|png|gif/;
	    const mimetype = filetypes.test(file.mimetype);
	    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

	    if (!mimetype && !extname) {
	    	req.fileValidationError = 'Only image files are allowed!';
	    	return cb(null, false, new Error("File upload only supports the images"));
	    }

	    cb(null, true);
	}
}


//console.log();
// const ext = path.extname(file.originalname).toLowerCase();
// if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {

// 	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
// 		  req.fileValidationError = 'Only image filesconste allowed!';
//                 return cb(null, false, new Error('Only image files allowed!'));
//           }
// 	// console.log('only images');
// 	// return cb(res.end('Only images allowed'), null);
// //}

// cb(null, true);