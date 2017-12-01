var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

//Checking if the passwords match
var compareHashes = (password, hash)=>{
  bcrypt.compare(password,hash, (err, res)=>{
    return res;
  });
}

module.exports = function(userModel) {
  return new LocalStrategy((email,pass,done) => {
    userModel.findOne({'emailAddress' : email},(err,user) => {
      console.dir(user)
      if (err) throw(err); 
      if (!user) return done('wrong',false);
      if(compareHashes(user.password, pass) === false) return done('wrong',null);
      user.status.lastSeen = Date.now(); 
      user.active = true;

      user.save((error) => {
        console.log(error);
        if (error) return done('server_error', false);
        done(null,user);
      });
    });
  });
}
