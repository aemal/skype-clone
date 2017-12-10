const router = require('express').Router();

module.exports = function loginout(passport){

	const isAuthenticated = function (req, res, next) {
	  if(req.isAuthenticated()) return next();
	  else res.redirect('/login');
	};

	router.get('/logout', (req, res) => {
	    req.logout();
	    res.redirect('/login');
    });

	router.get('/login',(req, res)=>res.send('Login page'));

	router.post('/login', passport.authenticate('local', { successRedirect: '/',
	                                   failureRedirect: '/login',
                                       failureFlash: true })
	);

	router.get('*', isAuthenticated,(req, res, next)=>res.redirect('/'));
	
    return router;
}