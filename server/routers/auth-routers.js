const router = require('express').Router();
const Signup = require('../auth/signup');
const User = require('../models/user.model');
const signup = new Signup(User);

module.exports = (passport)=>{

    router.get('/logout', (req, res, next) => {
        req.logout();
        res.send({ success : true, message : 'Logout succeeded' });
    });

    router.post('/login',(req, res, next)=>{
          passport.authenticate('signin', (err, user, info)=>{
            console.log(err);
            if (err) { return next(err); }
            if (!user) { return res.send({ success : false, message : 'Login failed, email or password is wrong' }); }
            req.logIn(user, (err)=>{
              if (err) return next(err);
              return res.send(user);
            });
          })(req, res, next);
    });

    router.post('/signup', signup.signup.bind(signup));

    router.get('/facebook', 
        passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

    router.get('/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
        (req, res)=>{
        res.redirect('/');
    });

    router.get('/github',
        passport.authenticate('github', { scope: [ 'user:email' ] }));

    router.get('/github/callback', 
        passport.authenticate('github', { failureRedirect: '/auth/login' }),
        (req, res)=>{
        res.redirect('/');
    });

    router.get('/twitter', 
        passport.authenticate('twitter'));
    router.get('/twitter/callback', 
        passport.authenticate('twitter',{failureRedirect: '/auth/login'}),
        (req, res)=>{
            res.send({ success : true, message : 'You are loged in through your twitter account' });
    });

    return router;
}
