const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

let oauthAccount =  new Schema({
  userId: String,
  accessToken: String,
  refreshToken: String,
  platform: String
}, {_id: false});

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  authAccounts: [oauthAccount],
  age: String
});

const hashPassword = function (password) {
  const hash = crypto.createHmac('sha512', process.env.JWT_SECRET);
  hash.update(password);

  return hash.digest('hex');
}

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashPassword(this.password);
  }

  next();
});


const User = mongoose.model('User', UserSchema);

User.prototype.comparePassword = function (password) {
  return hashPassword(password) === this.password;
}

User.prototype.toApi = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    age: this.age
  }
}

module.exports = User;