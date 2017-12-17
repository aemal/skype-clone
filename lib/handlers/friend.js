module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  add(req,res) {
    const requestObject = {
      fullName: req.body.fullName,
      avatarURL: req.body.avatarURL,
      userId: req.body.userId
    }

    try {
      req.user.contacts.requested.push(requestObject);
      req.user.save((err)=> {
        if (err) throw(err);
        this.userModel.findById(requestObject.userId,(err, user)=>{
          if (err) throw(err);
          user.contacts.pending.push(req.user.id)
          user.save((err)=>{
            if (err) throw(err);
            res.sendStatus(200)
          })
        })
      })
    }catch(err){
      res.sendStatus(500)
      console.log(err);
    }
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
