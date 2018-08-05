'use strict';
require('dotenv').config({
  path: __dirname + '/.env.development'
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const security = require('./security');

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true
});


const placesRouter = require('./routes/places');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const app = express();

app.use(bodyParser.json());

app.use('/places', security.verifyToken, placesRouter);
app.use('/users', security.verifyToken, usersRouter);
app.use('/auth', authRouter);


app.listen(process.env.PORT, function () {});