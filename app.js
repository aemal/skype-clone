const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');

const Message = require('./models/message.model');
const User = require('./models/user.model');
const db = 'mongodb://localhost:27017/skypeClone';


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
