const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	emailAddress: { type: String , lowercase: true},
	password: String,
	dateOfBirth: String,
	profile:{
		firstName: { type: String, lowercase: true , unique: true, required: true },
		lastName: { type: String, lowercase: true , unique: true, required: true },
		timestamp: { type : Date, default: Date.now },
		Avatar: String
	},
	status:{
		lastSeen: String,
	    active: String
	},
	socialMediaSignUp:{
		facebook: {type: String },
        twitter: {type: String },
        instagram: {type: String }},
	contacts:{
		list:[{
			friend: {
				firstName: String,
				lastName: String,
				Avatar: String
			}
		}],
		requested: Array,
		pending: Array,
		blocked: Array
	}
});

module.exports = mongoose.model('user', userSchema);
