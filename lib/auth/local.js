const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (userModel, passport)=>{
  passport.use('signin', new LocalStrategy((email,password,done) => {
    userModel.findOne({'emailAddress' : email},(err,user) => {
      if (err) throw(err); 
      if (!user) return done('wrong',false);
      bcrypt.compare(password, user.password, (err, result)=>{
         if (err) { return done(err); }
         if(result === true){
           user.status.lastSeen = Date.now(); 
           user.active = true;
           return done(null, user);
         }else{
           return done(null, false, console.log('errMsg','Invalid password.'));
         }
      });     
    });
  }));
}
