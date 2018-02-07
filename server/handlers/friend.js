module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  add(req,res, next) {
    
    const pending = {
      fullName: req.body.fullName,
      avatarURL: req.body.avatarURL,
      userId: req.body.userId
    }
    
    this.userModel.findOneAndUpdate({_id: req.id},
                    {
                     $set:{contacts : {
                            friends: [],
                            blocked: [],
                            requested: [],
                            pending: [pending],
                            decline: []
                        }
                      }
                    },{upsert: false ,multi: true}, (err, user)=>{
                            if (err)return next(err);
                            return res.json({ success : true, message : 'Request is sentd successfully...'});
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
