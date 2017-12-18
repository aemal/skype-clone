const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config/config');

module.exports = function (userModel, passport){
    passport.use(new TwitterStrategy({
        clientKey: configAuth.twitterAuth.consumerKey,
        clientSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
    },
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
    (token, tokenSecret,profile,done)=>{
        procces.nextTick(()=>{
            userModel.findOne({'twitter.id': profile.id}, (err,user)=>{
                if(err) return err;
                // if the user is found then log them in
                if(user){
                    return done(null, user);
                }else{
                    // if there is no user, create them
                    var newUser = new User();

                    // set all of the user data that we need
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    
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
        });
        
    }
    
    ));
}