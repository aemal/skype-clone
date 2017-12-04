const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const passport = require('passport');
const multiparty = require('./lib/handlers/file-upload');
const router = express.Router();

const SerialAuthenticator = require('./lib/auth/index');
const Message = require('./lib/models/message.model');
const User = require('./lib/models/user.model');
const Chat = require('./lib/models/chat.model');

const db = 'mongodb://localhost:27017/skypeClone';
const authStrategies = {
  local : require('./lib/auth/local')(User)
};

const serialAuthenticator = new SerialAuthenticator(User);

app.use((err,req, res, next)=>{});

app.use(router);
app.use(multiparty);

app.use(require('express-session')({ secret: "FIXME: I should be retrieved from env var ;(", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(authStrategies.local);

passport.serializeUser=serialAuthenticator.serialize;
passport.deserializeUser=serialAuthenticator.deserialize;

//Handlers
const UserHandler = require('./lib/handlers/user.js');
const FriendHandler = require('./lib/handlers/friend.js');
const MessageHandler = require('./lib/handlers/message.js');
const ProfileHandler = require('./lib/handlers/profile.js');
const ContactHandler = require('./lib/handlers/contact.js');

const userHandler = new UserHandler(User);
const friendHandler = new FriendHandler(User);
const messageHandler = new MessageHandler(Message, Chat);
const profileHandler = new ProfileHandler(User);
const contactHandler = new ContactHandler(User);

const port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.post('/message/get_history', messageHandler.messageHistory.bind(messageHandler));
app.get('/contacts/search/:keyword', contactHandler.searchContact.bind(contactHandler));

app.post('/message/send', messageHandler.send.bind(messageHandler));
app.get('/message/get/:id', messageHandler.get.bind(messageHandler));

app.get('/user/get_friends/:id', userHandler.get.bind(userHandler));
app.post('/user/register', userHandler.register.bind(userHandler));

app.get('/user/profile/:id', profileHandler.getProfile.bind(profileHandler));
router.post('/user/profile_edit/:id',profileHandler.editProfile.bind(profileHandler)); 

app.get('/friend/add/:id', friendHandler.add.bind(friendHandler));
app.get('/friend/accept/:id', friendHandler.accept.bind(friendHandler))
app.get('/friend/decline/:id', friendHandler.decline.bind(friendHandler))
app.get('/friend/remove/:id', friendHandler.remove.bind(friendHandler));

app.get('/login/local', passport.authenticate('local'), (req,res) => { res.send('ok') });

app.listen(port, function() {
  console.log('Server started on port.....' + port );
});

