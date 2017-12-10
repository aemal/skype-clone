const router = require('express').Router();

module.exports = function loginout(passport) {

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/auth/login');
    });

    router.get('/login', (req, res) => res.send('Login page'));

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));

    return router;
}