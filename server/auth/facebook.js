const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config');

module.exports = (userModel, passport)=>{
	passport.use(new FacebookStrategy({
			clientID: config.Facebook.APP_ID,
			clientSecret: config.Facebook.APP_SECRET,
			callbackURL: "http://localhost:8080/auth/facebook/callback",
			profileFields: ['id', 'displayName', 'photos', 'gender', 'birthday', 'email']
		}, (accessToken, refreshToken, profile, done)=>{
			userModel.findOne({
                'emailAddress': profile._json.email
            }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    // create the user
                    var user = new userModel({
                        emailAddress: profile._json.email,
                             // dateOfBirth: new Date(req.body.dateOfBirth),
                        profile: {
                            firstName: profile.displayName,
                            lastName: profile.name.familyName || 'Noun',
                            gender: profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) || 'Other', 
                            avatarURL: profile.photos?profile.photos[0].value: ''
                        },
                        loginStrategy: 'facebook'
                    });
                    try {
                        user.save((err) => {
                            if (err) throw (err);
                            console.log('User is created');    
                            return done(null, user);
                        });
                    } catch (err) {
                        console.log(err);
                        return done(err);
                    }
                }
            });

		}
	));
}

