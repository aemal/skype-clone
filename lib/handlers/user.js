module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  get(req,res) {
    userModel.find({_id: request.params.id}).exec((err, user)=>{
      if(err){
          response.send('We can not find the friends');
      }else{
           response.json(contact.contacts.list);
      }
    });
  }
}
