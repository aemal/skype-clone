const multiparty = require('./file-upload');
const bcrypt = require('bcryptjs');
module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getProfile(req,res) {
    this.userModel.findOne({_id: req.params.id}).exec((err, user)=>{
    if(err||!user){
          res.sendStatus(404);
      }else{
          res.json(user.profile);
      }
    });
  }
  
  updatePassword(req,res){
    this.userModel.findById(req.params.id,(err, user)=>{
      if(err){
        res.sendStatus(500);
      }else{
        bcrypt.genSalt(10,(err, salt)=>{
          bcrypt.hash(req.body.newPassword, salt, (err, hash)=>{
            user.password = hash;
          });
        })
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

  editProfile(req,res, next) {
        this.userModel.findById(req.params.id,(err, user)=>{
          if(err){
              res.sendStatus(500);
          }else{
              user.emailAddress = req.body.emailAddress || user.emailAddress,
              user.password = hash || user.password,
              user.dateOfBirth = new Date(req.body.dateOfBirth) || user.dateOfBirth,
              user.profile = {
                              firstName : req.body.firstName || user.profile.firstName,
                              lastName : req.body.lastName || user.profile.lastName,
                              gender: req.body.gender || user.profile.gender,
                              avatarURL : req.filename || user.profile.avatarURL
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