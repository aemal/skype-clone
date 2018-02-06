'use strict';

module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  };
  
  searchContact(req, res){
      let regex = new RegExp(req.params.keyword, 'i');
      let query = this.userModel.find({$or:[{'profile.firstName': regex}, {'profile.lastName': regex}]});
            
      query.exec((err, users)=>{
          if(err || !users){
            res.json({ success : false, message : 'Can not find any match names' });
          }else{
            let user = users.map(el=>({profile:el.profile, status:el.status, _id:el._id, dateOfBirth:el.dateOfBirth}));
            res.json(user);
          }
       });
   }
}