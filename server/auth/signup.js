const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (userModel, passport) => {
    passport.use('signup', new LocalStrategy({
            passReqToCallback: true
        },
        (req, username, password, done) => {
            userModel.findOne({
                'emailAddress': username
            }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, console.log('User already exists'));
                } else {
                    // create the user
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            var user = new userModel({
                                emailAddress: req.body.username,
                                password: hash,
                                dateOfBirth: new Date(req.body.dateOfBirth),
                                profile: {
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    gender: req.body.gender,
                                    avatarURL: 'avatar.jpg'
                                },
                                loginStrategy: 'signin',
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
                        });
                    });
                }
            });
        }));
}