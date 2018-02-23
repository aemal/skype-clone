'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
 
const app = express();

const router = express.Router();

const mockData = require("./server/mock-data");
const config = require("./server/config/config");
const SerialAuthenticator = require("./server/auth/index");
const User = require("./server/models/user.model");
const Message = require("./server/models/message.model");

const authRoutes = require("./server/routers/auth-routers")(passport);
const userRoutes = require("./server/routers/user-routers")();



const db = "mongodb://test:test@ds119988.mlab.com:19988/skypeclone";

//const db = config.DB_Connection.URL; 
const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(express.static('public'))

//Enable all CORS requests
app.use(cors());

app.use(router);
app.use("/auth", authRoutes); // login/out authentication routes
app.use("/user", userRoutes); // user authentication

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  require("express-session")({
    secret: config.SESSION_SECRET.SECRET_KEY,
    resave: true,
    saveUninitialized: true
  })
);

router.use(passport.initialize());
router.use(passport.session());

// passport de/serialize and local strategy
SerialAuthenticator(passport);

router.get("/", (req, res, next) => res.send("Home"));

// ErrorHandler, pass errors to the next function
app.use((err, req, res, next) => {
  res.send(err);
  next();
});

const server = app.listen(port, () => {
  console.log("Server started on port....." + port);
});


const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
  /*const sessionid = socket.id;
  console.log("Socket Connected: %s",  sessionid);
  socket.on('message', body => {
    socket.broadcast.emit('message', {
      body,
      id: sessionid,
    })
  })

  socket.on('joinRoom', (roomInfo)=>{
    console.log('joining room', roomInfo);
    //Save into chatmodel.
    socket.join(roomInfo.roomID);
  });
*/

  socket.on('joinRoom', (chatID) => {
    console.log('joining room', chatID);
    //Save into chatmodel.
    socket.join(chatID);
  });

  socket.on('privateMessage', function (data) {
    console.log('chatMessages', data);

    Message.create({
      chatID: data.chatID,
      userID: data.userID,
      message: data.messageBody
    })
      .then(data => console.log(data))
      .catch(err => console.log(err));

    socket.broadcast.to(data.chatID).emit('chatMessages', data);
  });

});


console.log(`SkypeClone's Socket server is running at port 8080...
Wait! for a while to start client side server.`);