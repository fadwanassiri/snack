const User = require('../models/user');

const usersController = {
  deleteById(userId, callback) {
    User.deleteOne({
      _id: userId
    }, callback);
  },
  getById(userId, callback) {
    User.findById(userId, callback);
  },
  getByEmail(userEmail, callback) {
    User.findOne({
      email: userEmail
    }, callback);
  },
  create(user, callback) {
    let newUser = new User(user);

    newUser.save(callback);
  },
  updateById(userId, user, callback) {
    User.updateOne({
      _id: userId
    }, user, callback);
  }
};

module.exports = usersController;