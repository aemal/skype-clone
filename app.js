const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const passport = require('passport');
const route = express.Router();
const mockData = require('./lib/mock-data');

const multiparty = require('./lib/handlers/file-upload');
const SerialAuthenticator = require('./lib/auth/index');
const Message = require('./lib/models/message.model');
const User = require('./lib/models/user.model');
const Chat = require('./lib/models/chat.model');

const db = 'mongodb://localhost:27017/skypeClone';

const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(route);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(require('express-session')({ secret: "FIXME: I should be retrieved from env var ;(", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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


app.get('/', (req, res)=>res.send('Home'));

app.post('/message/get_history', messageHandler.messageHistory.bind(messageHandler));
app.get('/contacts/search/:keyword', contactHandler.searchContact.bind(contactHandler));

app.post('/message/send', messageHandler.send.bind(messageHandler));
app.get('/message/get/:id', messageHandler.get.bind(messageHandler));

app.get('/user/get_friends/:id', userHandler.get.bind(userHandler));
app.post('/user/register', userHandler.register.bind(userHandler));

app.get('/user/profile/:id', profileHandler.getProfile.bind(profileHandler));
route.post('/user/profile_edit/:id', multiparty, profileHandler.editProfile.bind(profileHandler)); 

app.get('/friend/add/:id', friendHandler.add.bind(friendHandler));
app.get('/friend/accept/:id', friendHandler.accept.bind(friendHandler))
app.get('/friend/decline/:id', friendHandler.decline.bind(friendHandler))
app.get('/friend/remove/:id', friendHandler.remove.bind(friendHandler));

app.get('/login',(req, res)=> res.send('Login page'));
app.post('/login',(req,res, next)=>{ 
	  passport.authenticate('local', (err, user, info)=>{
	    if (err) { return next(err); }
	    if (!user) { return res.redirect('/login');}
	    req.logIn(user,(err)=>{
	      if (err) { return next(err); }
	      res.redirect('/');
	    });
	  })(req, res, next); 
});

const isAuthenticated = function (req, res, next) {
  if(req.isAuthenticated()) return next();
  else res.redirect('/login');
};

app.get('*', isAuthenticated,(req, res, next)=>{
    res.redirect('/');
});

// ErrorHandler, Please pass all the errors to the next function
app.use((err,req, res, next)=>res.status(err.status || 400).send(err.message));

// mockData(User,Message, (err)=>{
//   if(err){
//     throw err;
//   }
  app.listen(port, ()=>{
    console.log('Server started on port.....' + port );
  });
// });
