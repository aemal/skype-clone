const faker = require('faker');

module.exports = function(User,Message,callback) {

  function createUser(cb){
    User.create({
      emailAddress: faker.internet.email(),
      password: faker.internet.password(),
      dateOfBirth: faker.date.past(),
      profile:{
    		firstName: faker.name.firstName(),
    		lastName: faker.name.lastName(),
        gender: faker.random.arrayElement(['Male', 'Female', 'Other']),
    		Avatar: faker.image.avatar()
    	},
      status:{
    		lastSeen: faker.date.recent(),
    	  active: faker.random.boolean()
    	},
      loginStrategy:faker.random.arrayElement([
        // 'facebook',
        // 'twitter',
        // 'instagram',
        // 'github',
        'local'
      ]),
    	contacts:{
    		friends: [
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // },
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // },
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // },
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // }
        ],

    		blocked: [
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // },
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // },
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // }
        ],

    		requested: [
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // },
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // }
        ],

    		pending: [
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // },
          // {
          //   fullName:faker.name.findName(),
          //   avatarURL:faker.image.avatar(),
          //   userId:faker.random.uuid()
          // }
        ]
    	}
    }, (err, user) => {
      if (err) return err;
      console.info('created user with ID %s', user.id);
      cb();
    });
  }

  User.find({}).remove(function(err){
    if(err){
      return callback(err);
    }
    Message.find({}).remove(function(err){
      if(err){
        return callback(err);
      }
      createUser(function(err){
        if(err){
          return callback(err);
        }
        callback();
      })

    });
  });
}
