module.exports = class {
  constructor(userModel) {
    this.userModel = userModel;
  }

  serialize(userObject, done) {
    done(null,user.id);
  }
  deserialize(userID, done) {
    userModel.findById(userID, (error,user) => {
      done(error,user);
    });
  }
}
