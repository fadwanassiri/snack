'use strict';
require('dotenv').config({
  path: __dirname + '/.env.development'
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    fileLogger: {
      type: 'file',
      filename: './logs/snack.log',
      backups: 10,
      maxLogSize: 50000000
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['fileLogger', 'console'],
      level: 'info'
    }
  }
});

const logger = log4js.getLogger();

const security = require('./security');

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true
});


const placesRouter = require('./routes/places');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const app = express();

app.use(bodyParser.json());

app.use(log4js.connectLogger(logger, {
  level: log4js.levels.INFO
}));


// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', ['X-Requested-With, content-type', 'x-access-token']);

  if ('OPTIONS' === req.method) {
    return res.send(200);
  }

  next();
});

app.use('/places', security.verifyToken, placesRouter);
app.use('/users', security.verifyToken, usersRouter);
app.use('/auth', authRouter);


app.listen(process.env.PORT, function () {
  logger.info('server is up and running');
});