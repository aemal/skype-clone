const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (userModel)=>{
  return 'local', new LocalStrategy((email,password,done) => {
    userModel.findOne({'emailAddress' : email},(err,user) => {
      if (err) throw(err); 
      if (!user) return done('wrong',false);
      bcrypt.compare(password, user.password, (err, result)=>{
         if(result === true){
           user.status.lastSeen = Date.now(); 
           user.active = true;
           return done(null, user);
         }else{
           return done(null, false, console.log('errMsg','Invalid password.'));
         }
      });     
      user.save((error)=>{
        console.log(error);
        if (error) return done('server_error', false);
        done(null,user);
      });
    });
  });
}
