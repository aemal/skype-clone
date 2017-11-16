var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var Message = require('./models/message.model');
const User = require('./models/user.model');
var db = 'mongodb://localhost:27017/skypeClone';

const port = 8080;
mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/message/send', (req, res) => {
	var newMessage = new Message ({
		senderUserID: req.body.sendUserId,
		receiverUserID: req.body.receiveUserId,
		message: req.body.textMessage
	});
	newMessage.save((err, message) => {
		if(err) {
	      res.send('Error!');
	    } else {
	      res.send(message);
	    }
	});
});

app.get('/message/get/:id', (req, res) => {
	Message.findOne({
		message: req.params.id
	})
	.exec((err, message) => {
		if(err) {
			res.send('Error!');
		} else {
			res.json(message);
		}
	});
});

app.get('/users/:id', (req, res)=>{
    Contact.find({
        _id: request.params.id
    }).exec((err, contact)=>{
        if(err){
            response.send('We can not find the friends');
        }else{
             response.json(contact.contacts.list);
        }
    });
});

app.listen(port, function() {
	console.log('Server started .....')
});
