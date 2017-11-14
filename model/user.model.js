const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	emailAddress: String,
	password: String,
	dateOfBirth: String,
	profile:{
		firstName: String,
		lastName: String,
		Avatar: String
	},
	status:{
		lastSeen: String,
	    active: String
	},
	socialMediaSignUp:{},
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


