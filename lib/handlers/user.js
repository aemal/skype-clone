module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  get(req,res) {
    userModel.find({_id: req.params.id}).exec((err, user)=>{
      if(err){
          response.send('We can not find the friends');
      }else{
           response.json(user.contacts.list);
      }
    });
  }
}
