const router = require('express').Router();
const Signup = require('../auth/signup');
const Signin = require('../auth/signin');
const User = require('../models/user.model');

const signup = new Signup(User);
const signin = new Signin(User); 

module.exports = (passport)=>{

    router.get('/logout', (req, res, next) => {
        req.logout();
        res.json({ success : true, message : 'Logout succeeded' });
    });

    router.post('/login', signin.signin.bind(signin));

    router.post('/signup', signup.signup.bind(signup));

    router.get('/facebook', 
        passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

    router.get('/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
        (req, res)=>{
        res.json({ success : true, message : 'You are loged in through your twitter account' });
    });

    router.get('/github',
        passport.authenticate('github', { scope: [ 'user:email' ] }));

    router.get('/github/callback', 
        passport.authenticate('github', { failureRedirect: '/auth/login' }),
        (req, res)=>{
        res.json({ success : true, message : 'You are loged in through your twitter account' });
    });

    router.get('/twitter', 
        passport.authenticate('twitter'));
    router.get('/twitter/callback', 
        passport.authenticate('twitter',{failureRedirect: '/auth/login'}),
        (req, res)=>{
            res.json({ success : true, message : 'You are loged in through your twitter account' });
    });

    return router;
}
