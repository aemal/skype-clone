db.User.insert({
	emailAddress: "john@gmail.com",
	password: "john123",
	dateOfBirth: "1987.02.12",
	profile:{
		firstName: "john",
		lastName: "balout",
		gender: "Male",
		avatarURL: "statics/pics/image.jpg"
	},
	status:{
		lastSeen: "1987.02.12",
	    active: true
	},
	loginStrategy:"local",
	loginObject: {},
	contacts:{
		friends: [],
		blocked: [],
		requested: [],
		pending: []
	}
});
