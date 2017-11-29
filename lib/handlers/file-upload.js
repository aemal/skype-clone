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


