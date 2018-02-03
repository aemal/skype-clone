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

const db = config.DB_Connection.URL;
const port = config.SERVER_PORT.PORT;

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

// mockData(User, Message, (err) => {
  
    app.listen(port, () => {
        console.log('Server started on port.....' + port);
    });
// });
