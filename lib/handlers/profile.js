const sha512 = require('js-sha512');
const multer = require('multer');
const multerOpts = require('./file-upload');

module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getProfile(req,res) {
    this.userModel.findOne({_id: req.params.id}).exec((err, user)=>{
      if(err){
          res.sendStatus(404);
      }else{
          res.json(user.profile);
      }
    });
  }

  editProfile(req,res) {

    const upload = multer({storage: multerOpts.storage, 
                          fileFilter: multerOpts.fileFilter, 
                          limits: {fileSize: 1000000}}) //Check the filesize to avoid malicious
                          .single('avatar');

    upload(req, res, (err)=>{
        if(req.fileValidationError){
            res.send(req.fileValidationError);
        }else{
            res.send('File is uploaded');
            //res.redirect('/user/profile_edit/'+req.params.id);
        }
        
    });

    this.userModel.findById(req.params.id,(err, user)=>{
        if(err){
            res.sendStatus(500);
        }else{
            user.emailAddress = req.body.emailAddress || user.emailAddress,
            user.password = sha512(req.body.password) || user.password,
            user.dateOfBirth = new Date(req.body.dateOfBirth) || user.dateOfBirth,
            user.profile = {
                            firstName : req.body.firstName || user.profile.firstName,
                            lastName : req.body.lastName || user.profile.lastName,
                            gender: req.body.gender || user.profile.gender,
                            avatarURL : '' || user.profile.avatarURL 
                          }
        }
        try {
          user.save((err) => {
            if (err) throw(err);
            res.status(200).send(user);
          });
        } catch(err) {
          console.log(err);
          res.sendStatus(400);
        }  
      });
    }
}
