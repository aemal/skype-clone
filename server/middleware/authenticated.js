'use strict';

const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config').JWT_Secret;

module.exports = (req, res, next)=>{
        if (req.isAuthenticated() && req.headers.authorization.split(' ')[0] === 'TOKEN'){
            let token =  req.headers.authorization.split(' ')[1];
            jwt.verify(token, jwtSecret.SECRET_KEY, (err, decoded)=>{
                console.log(decoded);
                if(err) return next(err);
                else return next();
            });
        }else{
            return res.json({ success : false, message : 'Access denied' });
        };
    };  