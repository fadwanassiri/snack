const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

usersRouter.delete('/:userId', function (req, res) {
  const userId = req.params.userId;

  usersController.deleteById(userId, function (err) {
    if (err) {
      return res.send(err.message);
    }

    res.send(userId);
  });
});

usersRouter.get('/:userId', function (req, res) {
  const userId = req.params.userId;

  usersController.getById(userId, function (err, user) {
    if (err) {
      return res.send(err.message);
    }

    res.send(user);
  });
});

usersRouter.patch('/:userId', function (req, res) {
  const userId = req.params.userId;

  usersController.updateById(userId, req.body, function (err, user) {
    if (err) {
      return res.send(err.message);
    }

    res.send(user);
  });
});

usersRouter.put('', function (req, res) {
  usersController.create(req.body, function (err, user) {
    if (err) {
      return res.send(err.message);
    }

    res.send(user);
  });
});

module.exports = usersRouter;