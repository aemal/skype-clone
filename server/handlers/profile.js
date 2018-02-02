'use strict';

const bcrypt = require('bcryptjs');

module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getProfile(req,res) {
    this.userModel.findOne({_id: req.params.id}).exec((err, user)=>{
    if(err||!user){
          res.json({ success : false, message : 'User not found' });
      }else{
          let {emailAddress, profile, gender, dateOfBirth, status, _id, accessToken} = user;
          res.json({emailAddress, profile, gender, dateOfBirth, status});
      }
    });
  }
  
  updatePassword(req,res,next){
    let id = req.params.id;
    let password = req.body.password;
    if(password.length >= 8 && password.length <= 20){
        bcrypt.genSalt(10,(err, salt)=>bcrypt.hash(password, salt, (err, hash)=>{
            this.userModel.findOneAndUpdate({_id: id},
                        {
                         $set:{
                           password: hash
                          }
                        },{upsert: false}, (err, user)=>{
                                 if(err) return next(err);
                                 else return res.json({ success : true, message : 'Password is changed successfully' });
            });
        }));
    }else{
        return res.json({ success : false, message : 'Password is min 8 and max 20 characters' });
    }
  };

  editProfile(req,res, next) {
        let id = req.params.id,
            user = req.user,
            body = req.body,
            emailAddress = body.emailAddress.toLowerCase() || user.emailAddress,
            dateOfBirth = new Date(body.dateOfBirth) || user.dateOfBirth,
            profile = {
                       firstName: body.firstName || user.profile.firstName,
                       lastName: body.lastName || user.profile.lastName,
                       gender: body.gender || user.profile.gender,
                       avatarURL: req.filename || user.profile.avatarURL
                     };
        if(body.emailAddress){
            this.userModel.findOne({
                'emailAddress': req.body.emailAddress.toLowerCase()
            }, (err, user) => {
                if (err)return next(err);
                if (user) {
                    return res.json({ success : false, message : 'This email is already exist' });
                } else {
                    this.userModel.findOneAndUpdate({_id: id},
                                    {
                                     $set:{profile : profile,
                                          emailAddress : emailAddress,
                                          dateOfBirth : dateOfBirth
                                      }
                                    },{upsert: false ,multi: true}, (err, user)=>{
                                             if(err) return next(err);
                                             else return res.json({ success : true, message : 'profile is edited successfully' });
                    });
                }
              }
            );    
        }else{
            this.userModel.findOneAndUpdate({_id: id},
                            {
                             $set:{profile : profile,
                                  dateOfBirth : dateOfBirth
                              }
                            },{upsert: false ,multi: true}, (err, user)=>{
                                     if(err) return next(err);
                                     else return res.json({ success : true, message : 'profile is edited successfully' });
            });
        }
        
  }
};


