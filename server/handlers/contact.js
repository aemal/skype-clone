module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  };
  searchContact(req, res){
    this.userModel.find({$text:{$search:req.params.keyword}})
    .exec((err, contacts)=>{
      if(err){
        return res.json({ success : false,message: 'User has no contact or sth went wrong' });
      }else{
        res.json(contacts);
      }
    });
   }
}