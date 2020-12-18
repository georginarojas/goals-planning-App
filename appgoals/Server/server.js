// Creatign a structure

const express = require('express');

var path = require('path');

const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

const passport = require('passport');
const session = require('express-session');

// Initialization the app
const app = express();
app.use(express.json()); // allow to send data to api in json format

app.use(cors());
// Initialization the DB 
mongoose.connect('mongodb://localhost:27017/admingoals', {useNewUrlParser: true});



requireDir('./src/models');
require('./src/passport/local-auth');
require('./src/passport/jwt-auth');
// require('./src/config/jwtConfig');

// Middlewares
app.use(session({
    secret: '123', 
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 2*60*1000}
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes 
app.use('/api', require('./src/router') );


app.listen(process.env.PORT || 8080);