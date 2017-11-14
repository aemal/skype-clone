var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
	senderUserID: String,
	receiverUserID: String,
	message: String
});

var Messages = module.exports = mongoose.model('Messages', MessageSchema);

