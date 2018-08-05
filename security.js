const jwt = require('jsonwebtoken');

let security = {

  verifyToken: function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function (err, payload) {
        if (err) {
          res.status(403).send('Token invalid');
        } else {
          req.user = payload;
          next();
        }
      });
    } else {
      res.status(401).send('No Token found');
    }
  },

  generateToken: function (user) {
    return jwt.sign(user, process.env.JWT_SECRET);
  }

};

module.exports = security;