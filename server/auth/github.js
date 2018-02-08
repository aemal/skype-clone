const GitHubStrategy = require('passport-github2');
const config = require('../config/config');

module.exports = function (userModel, passport){
	passport.use(new GitHubStrategy({
	    clientID: config.GitHub.APP_ID,
	    clientSecret: config.GitHub.APP_SECRET,
	    callbackURL: "http://localhost:8080/auth/github/callback",
	    scope: ['user:email']
     },(accessToken, refreshToken, profile, done)=>{
  	  console.log(profile.emails[0].value);
  	    userModel.findOne({
                'emailAddress': profile.emails[0].value
            }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    // create the user
                    var user = new userModel({
                        emailAddress: profile.emails[0].value,
                        profile: {
                            firstName: profile.displayName,
                            lastName: profile.displayName || 'Noun',
                            avatarURL: profile.photos?profile.photos[0].value: ''
                        },
                        loginStrategy: 'github',
                        loginObject: {}, //We do not really need it for local strateggy so far 
                        contacts : {
                              decline : [ ],
                              pending : [ ],
                              requested : [ ],
                              blocked : [ ],
                              friends : [ ]
                            }
                    });
                    try {
                        user.save((err) => {
                            if (err) throw (err);
                            console.log('User is created');    
                            return done(null, user);
                        });
                    } catch (err) {
                        //TODO We should be able to handle different kind of errors and send an appropriate error message
                        console.log(err);
                    }
                }
            });
       }
   ));
}