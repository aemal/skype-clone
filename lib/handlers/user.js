const bcrypt = require('bcryptjs');

//Sync Password Hashing
let salt = bcrypt.genSaltSync(10);

module.exports = class {

   constructor(userModel) {
    
    this.userModel = userModel;
  }

  get(req,res) {
    this.userModel.findOne({_id: req.params.id}).exec((err, user)=>{
      if(err){
          res.send('We can not find the friends');
      }else{
          console.log(user.contacts.friends);
          res.json(user.contacts.friends);
      }
    });
  }
  register(req,res) {
    var user = new this.userModel({
      emailAddress : req.body.emailAddress,
      password : bcrypt.hashSync(req.body.password, salt),
      dateOfBirth : new Date(req.body.dateOfBirth),
      profile : {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        gender: req.body.gender,
        avatarURL : ' ' 
      },
      loginStrategy : 'local',
      loginObject : {}, //We do not really need it for local strateggy so far 
    });
    try {
      user.save((err) => {
        if (err) throw(err);
        res.sendStatus(200);
      });
    } catch(err) {
      //TODO We should be able to handle different kind of errors and send an appropriate error message
      console.log(err);
      res.sendStatus(400);
    }
  }
}


