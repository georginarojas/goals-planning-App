// Creatign a structure

const express = require('express');

var path = require('path');
const engine = require('ejs-mate');

const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

// Initialization the app
const app = express();
app.use(express.json()); // allow to send data to api in json format

app.use(cors());
// Initialization the DB 
mongoose.connect('mongodb://localhost:27017/admingoals', {useNewUrlParser: true});

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

requireDir('./src/models');
require('./src/passport/local-auth');
//require('./signin.ejs');

// Middlewares
app.use(session({
    secret: '123', 
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 2*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

 //app.use((req, res, next) => {
 //    app.locals.signinMessage = req.flash('signinMessage');
 //});

// Routes 
app.use('/api', require('./src/router') );


app.listen(8080);