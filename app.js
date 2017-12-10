const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser')

const app = express();
const router = express.Router();

const mockData = require('./lib/mock-data');
const SerialAuthenticator = require('./lib/auth/index');
const User = require('./lib/models/user.model');
const Message = require('./lib/models/message.model');

const authRoutes = require('./lib/routers/auth-routers')(passport);
const userRoutes = require('./lib/routers/user-routers')();

const db = 'mongodb://localhost:27017/skypeClone';

const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connection.openUri(db);

app.use(router);
app.use('/auth', authRoutes); // login/out authentication routes
app.use('/user', userRoutes); // user authentication

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(require('express-session')({
    secret: "FIXME: I should be retrieved from env var ;(",
    resave: true,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

// passport de/serialize and local strategy
SerialAuthenticator(passport);

router.get('/', (req, res, next) => res.send('Home'));

// ErrorHandler, pass errors to the next function
router.use((err, req, res, next) => res.status(err.status || 400).send(err.message));

mockData(User, Message, (err) => {
    if (err) {
        throw err;
    }
    app.listen(port, () => {
        console.log('Server started on port.....' + port);
    });
});