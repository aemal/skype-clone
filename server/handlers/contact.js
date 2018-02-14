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
            this.userModel.findById({_id: req.id}, (err, user)=>{
              let usersList; 
              user.contacts.friends.length>0? 
                user.contacts.friends.map(item=>
                usersList = users.filter(el=> 
                JSON.stringify(el._id) !== JSON.stringify(item.userId) && JSON.stringify(el._id) !== JSON.stringify(user._id))
                .map(user=>({profile:user.profile, status:user.status, _id:user._id, dateOfBirth:user.dateOfBirth})))
              :usersList= users.filter(el=> JSON.stringify(el._id) !== JSON.stringify(user._id))
                .map(user=>({profile:user.profile, status:user.status, _id:user._id, dateOfBirth:user.dateOfBirth}));
              res.json({usersList});
            });
          }
       });
   }
}