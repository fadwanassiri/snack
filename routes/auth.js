const express = require('express');
const security = require('../security');
const usersController = require('../controllers/usersController');
const authRouter = express.Router();

authRouter.post('/signup', function (req, res) {
  usersController.create(req.body, function (err, user) {
    if (err) {
      return res.send(err.message);
    }

    res.send({
      accessToken: security.generateToken(user.toApi())
    });
  });
});

authRouter.post('/signin', function (req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  usersController.getByEmail(userEmail, function (err, user) {
    if (err) {
      return res.send(err.message);
    }

    if (user) {
      if (user.comparePassword(userPassword)) {
        return res.send({
          accessToken: security.generateToken(user.toApi())
        });
      }
    }

    res.send('notFound').statusCode(404);
  });
});

module.exports = authRouter;