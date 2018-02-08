'use strict';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config/config');

module.exports = (userModel, passport) => {
    passport.use(new GoogleStrategy({
        clientID: config.Google.APP_ID,
        clientSecret: config.Google.APP_SECRET,
        callbackURL: config.Google.CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
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
                    password: 'none',
                    dateOfBirth: new Date(),
                    profile: {
                        firstName: profile.name.givenName || profile.displayName,
                        lastName: profile.name.familyName || 'none',
                        gender: profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) || 'Other',
                        avatarURL: profile.photos ? profile.photos[0].value : ''
                    },
                    loginStrategy: 'google'
                });
                try {
                    user.save((err) => {
                        if (err) throw (err);
                        console.log('User is created');
                        return done(null, user);
                    });
                } catch (err) {
                    console.error(err);
                    done(err);
                }
            }
        });

    }));
}