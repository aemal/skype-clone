var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
  roomID: {type: Schema.Types.ObjectId, ref: 'Chat'},
  userID: {type: Schema.Types.ObjectId, ref: 'User'},
  message: String
});

module.exports = mongoose.model('message', MessageSchema);