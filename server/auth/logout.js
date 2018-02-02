'use strict';

const decode = require('jwt-decode');
const User = require('../models/user.model');

module.exports = (req, res, next)=>{
		if (req.headers.authorization.split(' ')[0] === 'TOKEN'){
			let token =  req.headers.authorization.split(' ')[1];
			let decoded = decode(token);
			User.findById(decoded._id,(err, user)=>{
                    if(err || !user) return next(err);
                    if(user.accessToken.token === token){
                    	User.findOneAndUpdate({_id: decoded._id},
			                  {
			                   $set:{
			                     accessToken:{ token:undefined, created: Date.now()}
			                    }
			                  }, {upsert: false}, (err, user)=>{
								if(err || !user) return next(err);
								req.logout();
								if(req.params.id){
									return next();
								}else{
									return res.json({ success : true, message : 'Logout successfully' });
								} 
			            });
                    }else{
                        return res.json({ success : false, message : 'Wrong access, Please try again to logout...' });  
                    }
            });
 		}else{
			req.logout();
			return res.json({ success : true, message : 'Logout successfully' });
		}
}