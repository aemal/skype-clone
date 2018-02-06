const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (userModel, passport)=>{
  passport.use('signin', new LocalStrategy((username,password,done) => {
    userModel.findOne({'emailAddress' : username.toLowerCase()},(err,user) => {
      if (err) return done(err); 
      if (!user) return done(null,false, { message : 'Invalid e-mail address or password' });
      bcrypt.compare(password, user.password, (err, result)=>{
         if (err) { return done(err); }
         if(result === true){
           user.status.lastSeen = Date.now(); 
           user.active = true;
           return done(null, user);
         }else{
           return done(null, false, { message : 'Invalid password' });
         }
      });     
    });
  }));
}
