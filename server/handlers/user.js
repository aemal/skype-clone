module.exports = class {

  constructor(userModel) {
    
    this.userModel = userModel;
  }

  get(req,res,next) {
    this.userModel.findOne({_id: req.params.id}).exec((err, user)=>{
      if(err){
          next(err);
      }else{
          res.json(user.contacts.friends);
      }
    });
  }
}


