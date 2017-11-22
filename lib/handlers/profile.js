const sha512 = require('js-sha512')

module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getProfile(req,res) {
    this.userModel.find({_id: req.params.id}).exec((err, user)=>{
      if(err){
          res.sendStatus(404);
      }else{
          res.json(user.profile);
      }
    });
  }
  editProfile(req,res) {
    this.userModel.findById(req.params.id,(err, user)=>{
           if(err){
              res.sendStatus(500);
           }else{
                user.emailAddress = req.body.emailAddress || user.emailAddress,
                user.password = sha512(req.body.password) || user.password,
                user.dateOfBirth = new Date(Number(req.body.dateOfBirth)) || user.dateOfBirth,
                user.profile = {
                  firstName : req.body.firstName || user.profile.firstName,
                  lastName : req.body.lastName || user.profile.lastName,
                  gender: req.body.gender || user.profile.gender,
                  avatarURL : req.file.filename || user.profile.avatarURL, 
                }
             }
        try {
        user.save((err) => {
          if (err) throw(err);
          res.sendStatus(200);
        });
        } catch(err) {
        console.log(err);
        res.sendStatus(400);
       }  
    });
  }
}
