const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config').JWT_Secret;

module.exports = class {
    constructor(user){
        this.user = user;
    };

	signin(req, res, next){
        passport.authenticate('signin', (err, user, info)=>{
            if (err) { return next(err); }
            if (!user) { return res.json({ success : false, message : 'Login failed, email or password is wrong' });}
            req.logIn(user, (err)=>{
                if (err) return next(err);
                let {emailAddress, profile, gender, dateOfBirth, status, _id, accessToken} = user;
                let token = jwt.sign(
                            {emailAddress, profile, gender, dateOfBirth, status, _id},
                            jwtSecret.SECRET_KEY, 
                            { expiresIn: '3000s' }); 
                
                this.user.findOneAndUpdate({_id: _id},
                      {
                     $set:{
                       accessToken:{ token:token, created: Date.now()}
                     }
                      }, {upsert: true, new: true}, (err, user)=>{
                             if(err) return next(err);
                             else next();
                });
                res.json({token: token});
            });
	    })(req, res, next);
    }
} 