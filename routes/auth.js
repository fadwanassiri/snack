const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const security = require("../security");
const usersController = require("../controllers/usersController");
const authRouter = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

authRouter.post("/signup", function(req, res) {
  usersController.create(req.body, function(err, user) {
    if (err) {
      return res.send(err.message);
    }

    res.send({
      accessToken: security.generateToken(user.toApi())
    });
  });
});

authRouter.post("/google", function(req, res) {
  let googleAccessToken = req.body.accessToken;
  let googleUserId = req.body.userId;
  client.verifyIdToken(
    {
      idToken: googleAccessToken,
      audience: process.env.GOOGLE_CLIENT_ID
    },
    function(err, user) {
      if (err) {
        res.status(401);
        return res.send('Google Token not valid');
      }
      

      res.send("QDS");
    }
  );
});

authRouter.post("/signin", function(req, res) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  usersController.getByEmail(userEmail, function(err, user) {
    if (err) {
      res.status(500);
      return res.send(err.message);
    }

    if (user) {
      if (user.comparePassword(userPassword)) {
        return res.send({
          accessToken: security.generateToken(user.toApi())
        });
      }
    }
    res.status(404);
    res.send("notFound");
  });
});

module.exports = authRouter;
