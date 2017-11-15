var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Message = require('./models/message');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var db = 'mongodb://localhost:27017/skypeClone';
mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/message', (req, res) => {
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

app.get('/:message', (req, res) => {
	Message.findOne({
		message: req.params.message
	})
	.exec((err, message) => {
		if(err) {
			res.send('Error!');
		} else {
			res.json(message);
		}
	});
});

app.listen(3000, function() {
	console.log('Server started .....')
});