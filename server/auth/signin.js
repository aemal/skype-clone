'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config').JWT_Secret;

module.exports = class {
  constructor(User){
      this.User = User;
  };

	signin(req, res, next){
        passport.authenticate('signin', (err, user, info)=>{
            if (err || !user) { return res.json({ success : false, message : 'Login failed, email or password is wrong' }); }
            req.logIn(user, (err)=>{
                if (err) return next(err);
                let {emailAddress, profile, gender, dateOfBirth, status, _id, accessToken, avatarURL, contact} = user;
                let token = jwt.sign(
                            {emailAddress, profile, gender, dateOfBirth, status, _id, avatarURL, contact},
                            jwtSecret.SECRET_KEY, 
                            { expiresIn: 14 * 24 * 60 * 60 }); 
                
                this.User.findOneAndUpdate({_id: _id},
                      {
                       $set:{
                         accessToken:{ token:token, created: Date.now()}
                        }
                      }, {upsert: true, new: true}, (err, user)=>{
                             if(err || !user) return next(err);
                             else next();
                });
                res.json({token: token});
            });
	    })(req, res, next);
    }
} 

