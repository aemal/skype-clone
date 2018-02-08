module.exports = class {

  constructor(userModel) {
    this.userModel = userModel;
  }

  get(req,res,next) {
    this.userModel.findOne({_id: req.id}).exec((err, user)=>{
      if(err || !user){
          res.json({success : false, message : "Friends are not available..."})
      }else{
          res.json(user.contacts.friends);
      }
    });
  }
}


