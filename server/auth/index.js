const User = require('../models/user.model');
const authStrategies = {
  local : require('../auth/local'),
  facebook : require('../auth/facebook'),
  github : require('../auth/github'),
  twitter: require('../auth/twitter'),
  google: require('../auth/google')
};

module.exports = (passport)=>{
  // serialize sessions
  passport.serializeUser((user, done)=>{
    done(null, user.id)
  });

  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
      done(err, user)
    })
  });

  // use these strategies
  authStrategies.local(User, passport);
  authStrategies.facebook(User, passport);
  authStrategies.github(User, passport);
  authStrategies.twitter(User, passport);
  authStrategies.google(User, passport);
};