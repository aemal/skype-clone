module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  add(req,res) {
    try {
      req.user.contacts.requested.push(req.params.id);
      req.user.save((err)=> {
        if (err) throw(err);
        this.userModel.findById(req.params.id,(err, user)=>{
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
        req.user.contacts.requested.splice(req.user.contacts.requested.indexOf(req.params.id),1);
        req.user.contacts.friends.push(req.params.id);
        req.user.save((err)=>{
          if (err) throw(err);
          this.userModel.findById(req.params.id,(err, user)=>{
            if (err) throw(err);
            user.contacts.pending.splice(req.user.contacts.pending.indexOf(req.user.id),1);
            user.contacts.friends.push(req.user.id);
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
      res.status(404);
      res.send('Implementation missing!');
    }
  remove(req,res) {
    res.status(404);
    res.send('Implementation missing!');
  }

}
