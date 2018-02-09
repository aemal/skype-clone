var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema ({
  participants: {	
  					userID: {type: Schema.Types.ObjectId, ref: 'User'},
			 		friendID: {type: Schema.Types.ObjectId, ref: 'User'}
			 	}
			 	
});

module.exports = mongoose.model('chat', ChatSchema);