// Creatign a structure

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

// Initialization the app
const app = express();
app.use(express.json()); // allow to send data to api in json format

app.use(cors());
// Initialization the DB 
mongoose.connect('mongodb://localhost:27017/admingoals', {useNewUrlParser: true});


requireDir('./src/models');

// Routes 
app.use('/api', require('./src/routes') );

app.listen(8080);