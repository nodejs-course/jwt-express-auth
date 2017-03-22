const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const User = require('../models/User');

const authHelper = require('../helpers/authHelper');

router.post('/login', (req, res, next) => { // /auth/login
  const { email, password} = req.body;

  const shaSum = crypto.createHash('sha256');
  shaSum.update(password);

  User.findOne({email:email, password:shaSum.digest('hex')})
    .then((user) => res.send({
      user: user,
      token: authHelper.createToken({
        userId: user._id,
        role: user.role
      })
    }))
    .catch(next);
});

module.exports = router;
