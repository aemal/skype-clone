const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	emailAddress: { type: String , lowercase: true, unique : true},
  password: String, // Do not forget, this is an SHA-512 Digest, NOT pure password
	dateOfBirth: String,
	profile:{
		firstName: { type: String, lowercase: true, required: true },
		lastName: { type: String, lowercase: true, required: true },
		timestamp: { type : Date, default: Date.now },
		avatarURL: String
	},
	status:{
		lastSeen: { type: Date },
	  active: Boolean
	},
  loginStrategy : {type : String, enum : {values : ['facebook','twitter','instagram','github'], message : 'Unknown oAuth provider ;('}},
  loginObject : Object,
	contacts:{
    friends : [{ type: Schema.Types.ObjectId, ref: 'User', unique : true}],
    blocked : [{ type: Schema.Types.ObjectId, ref: 'User' , unique : true}],
    requested : [{ type: Schema.Types.ObjectId, ref: 'User', unique : true}],
    pending : [{ type: Schema.Types.ObjectId, ref: 'User', unique : true}]
	}
});

module.exports = mongoose.model('user', userSchema);
