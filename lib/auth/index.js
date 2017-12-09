const User = require('../models/user.model');
const authStrategies = {local : require('../auth/local')(User)};

module.exports = function (passport) {
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
 passport.use(authStrategies.local);
};