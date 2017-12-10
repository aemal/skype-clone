const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser')

const app = express();
const router = express.Router();

const mockData = require('./lib/mock-data');
const multiparty = require('./lib/handlers/file-upload');
const SerialAuthenticator = require('./lib/auth/index');
const Message = require('./lib/models/message.model');
const User = require('./lib/models/user.model');
const Chat = require('./lib/models/chat.model');
const authRoutes = require('./lib/router/auth-routers')(passport);

const db = 'mongodb://localhost:27017/skypeClone';

const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(router);
app.use('/', authRoutes);  // login/out authentication routes

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true }));
router.use(require('express-session')({ secret: "FIXME: I should be retrieved from env var ;(", resave: true, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

// passport de/serialize and local strategy
SerialAuthenticator(passport); 

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

router.get('/', (req, res, next)=>res.send('Home'));

router.post('/message/get_history', messageHandler.messageHistory.bind(messageHandler));
router.get('/contacts/search/:keyword', contactHandler.searchContact.bind(contactHandler));

router.post('/message/send', messageHandler.send.bind(messageHandler));
router.get('/message/get/:id', messageHandler.get.bind(messageHandler));

router.get('/user/get_friends/:id', userHandler.get.bind(userHandler));
router.post('/user/register', userHandler.register.bind(userHandler));

router.get('/user/profile/:id', profileHandler.getProfile.bind(profileHandler));
router.post('/user/profile_edit/:id', multiparty, profileHandler.editProfile.bind(profileHandler)); 

router.get('/friend/add/:id', friendHandler.add.bind(friendHandler));
router.get('/friend/accept/:id', friendHandler.accept.bind(friendHandler))
router.get('/friend/decline/:id', friendHandler.decline.bind(friendHandler))
router.get('/friend/remove/:id', friendHandler.remove.bind(friendHandler));

// ErrorHandler, pass errors to the next function
router.use((err,req, res, next)=>res.status(err.status || 400).send(err.message));

mockData(User,Message, (err)=>{
  if(err){
    throw err;
  }
  app.listen(port, ()=>{
    console.log('Server started on port.....' + port );
  });
});
