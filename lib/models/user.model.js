const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contact = new Schema({
	fullName: { type:String, required:true },
	avatarURL: { type:String, required:true },
	userId: { type:Schema.Types.ObjectId, required:true, ref: 'User'}
})
//1
const userSchema = new Schema({
	emailAddress: { type: String , lowercase: true, unique : true},
  password: String, // Do not forget, this is an SHA-512 Digest, NOT pure password
	dateOfBirth: Date,
	profile:{
		firstName: { type: String, lowercase: true, required: true },
		lastName: { type: String, lowercase: true, required: true },
		gender: {type : String, enum : {values : [ 'Male', 'Female', 'Other']}},
		avatarURL: String
	},
	status:{
		lastSeen: { type: Date },
	  active: {type : Boolean, default : false}
	},
    loginStrategy : {type : String, enum : {values : ['facebook','twitter','instagram','github','local'], message : 'Unknown oAuth provider ;('}},
    loginObject : Object,
	contacts:{
		friends : [contact],
		blocked : [contact],
		requested : [contact],
		pending : [contact]
	}

});

userSchema.virtual('fullName').get(function() {  
    return this.profile.firstName + ' ' + this.profile.lastName;
});

module.exports = mongoose.model('user', userSchema);