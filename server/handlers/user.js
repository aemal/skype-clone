module.exports = class {

  constructor(userModel) {
    
    this.userModel = userModel;
  }

  get(req,res) {
    this.userModel.findOne({_id: req.params.id}).exec((err, user)=>{
      if(err){
          res.send('We can not find the friends');
      }else{
          res.json(user.contacts.friends);
      }
    });
  }
}


