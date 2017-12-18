module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  };
  searchContact(req, res){
    this.userModel.find({$text:{$search:req.params.keyword}})
    .exec((err, contacts)=>{
      if(err){
        res.send('Error');
      }else{
        res.json(contacts);
      }
    });
   }
}