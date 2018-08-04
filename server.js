'use strict';
require('dotenv').config({
  path: __dirname + '/.env.development'
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true
});


const placesRouter = require('./routes/places');
const app = express();

app.use(bodyParser.json());
app.use('/places', placesRouter);

app.listen(process.env.PORT, function () {});