const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config/config');

module.exports =(userModel, passport)=>{
    passport.use(new TwitterStrategy({
        consumerKey: '4xHOvecu41ApJhIpAPK3HXXLw',
        consumerSecret: 'YukabU2gin1dlLZ96gcjEWOWGDkfCOyxHwSwi0SLLbpSC1Vh53',
        callbackURL: "http://localhost:8080/auth/twitter/callback"
    },
      (token, tokenSecret, profile, cb)=>{
            console.log(profile);
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
                            avatarURL: profile.photos?profile.photos[0].value: 'avatar.jpg'
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
                        //TODO We should be able to handle different kind of errors and send an appropriate error message
                        console.log(err);
                    }
                }
            });

      }
    ));
}
