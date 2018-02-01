
const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cors = require("cors");

const app = express();

const router = express.Router();

const mockData = require("./server/mock-data");
const SerialAuthenticator = require("./server/auth/index");
const User = require("./server/models/user.model");
const Message = require("./server/models/message.model");

const authRoutes = require("./server/routers/auth-routers")(passport);
const userRoutes = require("./server/routers/user-routers")();

const db = "mongodb://test:test@ds119988.mlab.com:19988/skypeclone";
// "mongodb://test:test@ds119988.mlab.com:19988/skypeclone";

const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

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
    secret: "FIXME: I should be retrieved from env var ;(",
    resave: true,
    saveUninitialized: true
  })
);

router.use(passport.initialize());
router.use(passport.session());
// router.use(flash());

// passport de/serialize and local strategy
SerialAuthenticator(passport);

router.get("/", (req, res, next) => res.send("Home"));

// ErrorHandler, pass errors to the next function
app.use((err, req, res, next) => {
  res.send(err);
  next();
});

// mockData(User, Message, (err) => {

app.listen(port, () => {
  console.log("Server started on port....." + port);
});
// });

// function sessionCleanup() {
//   sessionStorage.all(function(err, sessions) {
//     for (var i = 0; i < sessions.length; i++) {
//       sessionStore.get(sessions[i], function() {});
//     }
//   });
// }

// setInterval(sessionCleanup(), 3000);
