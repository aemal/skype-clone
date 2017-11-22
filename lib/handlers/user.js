const sha512 = require('js-sha512')

module.exports = class {

   constructor(userModel) {
    
    this.userModel = userModel;
  }

  get(req,res) {
    this.userModel.find({_id: req.params.id}).exec((err, user)=>{
      if(err){
          res.send('We can not find the friends');
      }else{
          console.log(user.fullName);
          res.json(user.contacts);
      }
    });
  }
  register(req,res) {
    var user = new this.userModel({
      emailAddress : req.body.emailAddress,
      password : sha512(req.body.password),
      dateOfBirth : new Date(Number(req.body.dateOfBirth)),
      profile : {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        gender: req.body.gender,
        avatarURL : req.file.filename, 
        timestamp : Date.now() //FIXME: I have no fucking clue what is this for ^.^
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
