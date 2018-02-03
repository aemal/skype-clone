'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailValidation = email => {
    const valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return valid.test(email);
};

const contact = new Schema({
    fullName: {
        type: String,
        required: true
    },
    avatarURL: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const userSchema = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email is required',
        validate: [emailValidation, 'Email is not valid...']
    },
    password: {
            type: String,
            required: 'Fill the password field',
        },
    dateOfBirth: {
            type: Date,
            required: 'Date of birth is required',
        },
    profile: {
        firstName: {
            type: String,
            required: 'First name is required...',
            minlength: [3, 'First name must has min 3 and max 20 characters ...'],
            maxlength: [20, 'First name must has min 3 and max 20 characters ...']
        },
        lastName: {
            type: String,
            required: 'Last name is required...',
            minlength: [3, 'Last name must has min 3 and max 20 characters ...'],
            maxlength: [20, 'Last name must has min 3 and max 20 characters ...']
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female', 'Other'],
    			message: 'Select gender ...'
            }
        },
        avatarURL: String
    },
    status: {
        lastSeen: {
            type: Date
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    loginStrategy: {
        type: String,
        enum: {
            values: ['facebook', 'twitter', 'instagram', 'github', 'signin'],
            message: 'Unknown oAuth provider ;('
        }
    },
    loginObject: Object,
    contacts: {
        friends: [contact],
        blocked: [contact],
        requested: [contact],
        pending: [contact],
        decline: [contact]
    },
    accessToken:{
    	token: {
	        type: String,
	    },
	    created: {
	        type: Date
	    }
	}
});

userSchema.virtual('fullName').get(()=>{
    return this.profile.firstName + ' ' + this.profile.lastName;
});

const User = mongoose.model('user', userSchema);

//To check the email is unique or not...
User.schema.path('emailAddress').validate((value, done)=>{                                                                                           
   User.findOne({ emailAddress: value },(err, user)=>{ 
      if(err) return done(err);
      done(!user);                                                                                                                         
    });                                                                                                                                                  
}, 'This email address is already registered');

module.exports = User;