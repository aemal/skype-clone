'use strict';

const logout = require('../auth/logout');
const bcrypt = require('bcryptjs');
const fs = require('fs');

function deleteAvatar(req, next){
    let uploadDir = __dirname + '/../../public/images/avatars';
    fs.unlink(`${uploadDir}/${req.filename}`, err=>{if(err) next();});
}

module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  } 
  getProfile(req,res,next) {
    this.userModel.findOne({_id: req.id}).exec((err, user)=>{
    if(err||!user){
          res.json({ success : false, message : 'User not found' });
      }else{
          let {emailAddress, profile, gender, dateOfBirth, status, _id, accessToken} = user;
          res.json({emailAddress, profile, gender, dateOfBirth, status});
      }
    });
  }
  
  updatePassword(req,res,next){
    let id = req.id;
    let password = req.body.password;
    if(password.length >= 8 && password.length <= 20){
        bcrypt.genSalt(10,(err, salt)=>bcrypt.hash(password, salt, (err, hash)=>{
            this.userModel.findOneAndUpdate({_id: id},
                        {
                         $set:{
                           password: hash
                          }
                        },{upsert: false}, (err, user)=>{
                                 if(err || !user) return next(err);
                                 logout(req, res, next);
                                 return res.json({ success : true, message : 'Password is changed successfully, please login with new password...' });
            });
        }));
    }else{
        return res.json({ success : false, message : 'Password is min 8 and max 20 characters' });
    }
  };

  editProfile(req,res,next) {
        let id = req.id;
        let user = req.user;
        let body = req.body;
        let emailAddress = body.emailAddress || user.emailAddress;
        let dateOfBirth = new Date(body.dateOfBirth) || user.dateOfBirth;
        let profile = {
                       firstName: body.firstName || user.profile.firstName,
                       lastName: body.lastName || user.profile.lastName,
                       gender: body.gender || user.profile.gender,
                       avatarURL: req.filename || user.profile.avatarURL
                     };
        if(body.emailAddress){
            this.userModel.findOne({
                'emailAddress': req.body.emailAddress.toLowerCase()
            }, (err, user) => {
                if (err){
                  deleteAvatar(req, next);
                  return next(err);
                };
                if (user) {
                    deleteAvatar(req, next);
                    return res.json({ success : false, message : 'This email is already exist' });
                } else {
                    this.userModel.findOneAndUpdate({_id: id},
                                    {
                                     $set:{profile : profile,
                                          emailAddress : emailAddress.toLowerCase(),
                                          dateOfBirth : dateOfBirth
                                      }
                                    },{upsert: false ,multi: true}, (err, user)=>{
                                          if (err || !user){
                                            deleteAvatar(req, next);
                                            return res.json({ success : false, message : 'profile is not edited....', Error: err});
                                          };
                                          logout(req, res, next);
                                          return res.json({ success : true, message : 'profile is edited successfully, please login with new email...'});
                    });
                }
              }
            );    
        } else {
            this.userModel.findOneAndUpdate({_id: id},
                            {
                             $set:{profile : profile,
                                  dateOfBirth : dateOfBirth
                              }
                            },{upsert: false ,multi: true}, (err, user)=>{
                                  if(err || !user){
                                    deleteAvatar(req, next); 
                                    return res.json({ success : false, message : 'profile is not edited....', Error: err});
                                  };
                                  let sendUser = user => new Promise(res=> res(user));
                                  sendUser(user).then((user)=>{
                                    let userObj = {};
                                    if(user.profile.avatarURL !== req.filename){
                                      let avatarURL = req.filename;
                                      let {emailAddress, profile, gender, dateOfBirth, _id, status} = user;
                                      return userObj =  {emailAddress, profile, gender, dateOfBirth, avatarURL, _id};                                   
                                    };
                                  }).then((data)=>res.json({ success : true, message : 'profile is edited successfully', user: data}));
                                  
            });
        }       
  }
};


