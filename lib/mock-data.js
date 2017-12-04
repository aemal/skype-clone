const faker = require('faker');

module.exports = function(User,Message,callback) {

  function createUsers(cb){
    const data = [];
    for(let i = 0; i < 10; i++){
      data.push({
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
      });
    }
    User.create(data,cb);
  }
  function createMessages (userIds,cb){
    const messages = userIds.map(function (id){
      return {
        senderID: id,
        message: faker.lorem.text()
      };
    });
    Message.create(messages,cb)
  }

  User.find({}).remove(function(err){
    if(err){
      return callback(err);
    }
    Message.find({}).remove(function(err){
      if(err){
        return callback(err);
      }
      createUsers(function(err,users){
        if(err){
          return callback(err);
        }
        const ids = users.map(function (user){
          return user.id;
        });
        createMessages(ids, function(err){
          if(err) return callback(err);
          console.log('user ids',ids);
          callback();
        })

      })

    });
  });
}
