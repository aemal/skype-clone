module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  add(req,res, next) {
    
    const friendRequest = {
      fullName: req.body.fullName,
      avatarURL: req.body.avatarURL,
      userId: req.body.userId
    }

    this.userModel.findById({_id: req.id}, (err, user)=>{
        if (err || !user)return next(err);
        let friend = user.contacts.friends;
        friend.push(friendRequest);
        if(friend.length>0){
          let contacts = {
                            friends: friend,
                            blocked: [],
                            requested: [],
                            pending: [],
                            decline: []
                        };
            this.userModel.findOneAndUpdate({_id: req.id},
                            {
                             $set:{contacts : contacts
                              }
                            },{upsert: false ,multi: true}, (err, user)=>{
                                    if (err || !user)return next(err);

                                    this.userModel.findById({_id: req.body.userId}, (err, user2)=>{
                                            if (err || !user2)return next(err);
                                            let friendAccept = user2.contacts.friends;
                                            friendAccept.push({
                                                          fullName: user.profile.firstName,
                                                          avatarURL: user.profile.avatarURL,
                                                          userId: user._id
                                                        });
                                            if(friendAccept.length>0){
                                              let contacts = {
                                                                friends: friendAccept,
                                                                blocked: [],
                                                                requested: [],
                                                                pending: [],
                                                                decline: []
                                                              };
                                              this.userModel.findOneAndUpdate({_id: req.body.userId},
                                                              {
                                                               $set:{contacts : contacts
                                                                }
                                                              },{upsert: false ,multi: true}, (err, user2)=>{
                                                                      if (err || !user2)return next(err);
                                                                      res.json({ success : true, message : 'Request is sent successfully...'});
                                              });
                                            }
                                    });        
            });
        }

    });
  }
  accept(req,res) {
    try{
     let pendinRequest = req.user.contacts.requested.splice(req.user.contacts.requested.indexOf(req.params.id),1);
        req.user.contacts.friends.push(pendinRequest);
        req.user.save((err)=>{
          if (err) throw(err);
          this.userModel.findById(req.params.id,(err, user)=>{
            if (err) throw(err);
          let requestReciver =  user.contacts.pending.splice(req.user.contacts.pending.indexOf(req.user.id),1);
            user.contacts.friends.push(requestReciver);
            user.save((err)=>{
              if (err) throw(err);
              res.sendStatus(200);
            })
          })
        })
    }catch(err){
      res.sendStatus(500)
      consolelog(err);
    }
  }

  decline(req,res) {
       req.user.contacts.requested.splice(req.user.contacts.requested.indexOf(req.params.id),1);
       this.userModel.findById(req.params.id,(err, user)=>{
         if (err) throw(err);
        user.contacts.pending.splice(req.user.contacts.pending.indexOf(req.user.id),1);
        user.save((err)=>{
          if (err) throw(err);
          res.sendStatus(200);
        });

      });

    }
  remove(req,res) {
    req.user.contacts.friends.splice(req.user.contacts.requested.indexOf(req.params.id),1);
    this.userModel.findById(req.params.id,(err, user)=>{
      if (err) throw(err);
      user.contacts.friends.splice(req.user.contacts.friends.indexOf(req.user.id),1);
      user.save((err)=>{
        if (err) throw(err);
        res.sendStatus(200);
      });

    });

  }

}
