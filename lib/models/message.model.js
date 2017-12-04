var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
  chatID: {type: Schema.Types.ObjectId, ref: 'Chat'},
  senderID: {type: Schema.Types.ObjectId, ref: 'User'},
  message: String
});

module.exports = mongoose.model('message', MessageSchema);