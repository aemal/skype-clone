var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var Message = require('./models/message.model');
const User = require('./models/user.model');
var db = 'mongodb://localhost:27017/skypeClone';


//Handlers

const UserHandler = require('./handlers/user.js');
const MessageHandler = new require('./handlers/message.js');

const userHandler = new UserHandler(User);
const messageHandler = new MessageHandler(Message);

const port = 8080;
mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/message/send', messageHandler.send.bind(this));

app.get('/message/get/:id', messageHandler.get.bind(this));
app.get('/user/get/:id', userHandler.get.bind(this));

app.listen(port, function() {
	console.log('Server started .....')
});
