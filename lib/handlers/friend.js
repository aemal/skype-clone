module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  add(req,res) {
    res.status(404);
    res.send('Implementation missing!');
  }
  accept(req,res) {
    res.status(404);
    res.send('Implementation missing!');
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
