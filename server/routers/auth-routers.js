const router = require('express').Router();

module.exports = function loginout(passport) {

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/auth/login');
    });

    router.route('/login').get((req, res) => res.send('Login page'))
    .post(passport.authenticate('signin', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));

    router.route('/register').get((req, res) => res.send('register page'))
    .post(passport.authenticate('signup', {
        successRedirect: '/auth/login',
        failureRedirect: '/auth/register',
        failureFlash: true
    }));
    return router;
}