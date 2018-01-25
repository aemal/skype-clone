const bcrypt = require('bcryptjs');

module.exports = class {
    constructor(userModel){
        this.userModel = userModel;
    };
    
    signup(req, res, next){
        console.log("Body=", req.body); 
            this.userModel.findOne({
                'emailAddress': req.username
            }, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (user) {
                    return res.send({ success : false, message : 'Singin failed, email is already exist' });;
                } else {
                    let password = req.body.password;
                    console.log(password);
                    if(password.length >= 8 && password.length <= 20){
                        // create the user
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                let user = new this.userModel({
                                        emailAddress: req.body.username,
                                        password: hash,
                                        dateOfBirth: new Date(req.body.dateOfBirth),
                                        profile: {
                                            firstName: req.body.firstName,
                                            lastName: req.body.lastName,
                                            gender: req.body.gender,
                                            avatarURL: 'avatar.jpg'
                                        },
                                        loginStrategy: 'signin'
                                });
                                try {
                                    user.save((err) => {
                                        if (err){ 
                                            return next(err)
                                        }else{;
                                            return res.send(user)
                                        };
                                    });
                                } catch (err) {
                                    return next(err);
                                }
                            });
                        });   
                    }else{
                        return res.send({ success : false, message : 'Password is min 8 and max 20 characters' });;
                    }
                    
                }
            });
        };
}