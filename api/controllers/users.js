const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User');

const authHelper = require('../helpers/authHelper');
const adminHelper = require('../helpers/adminHelper');

router.post('/', addUser);

router.get('/', authHelper.checkMiddleware, adminHelper, getUsers);
router.get('/:id', authHelper.checkMiddleware, getUser);
router.delete('/:id', authHelper.checkMiddleware, adminHelper, deleteUser);

module.exports = router;

function addUser(req, res, next) {
  const shaSum = crypto.createHash('sha256');
  shaSum.update(req.body.password);

  let user = new User({
    email: req.body.email,
    password: shaSum.digest('hex'),
    role: req.body.role
  });
  user.save()
    .then((user) => res.send({
      user: user,
      token: authHelper.createToken({
        userId: user._id,
        role: user.role
      })
    }))
    .catch(next);
}

function getUsers(req, res, next) {
    User.find({})
      .then((users) => res.send(users))
      .catch(next);
}

function getUser(req, res, next) {
  const userId = (req.params.id === 'me') ? req.decoded.userId : req.params.id;

  User.findOne({_id: userId})
    .then((user) => res.send(user))
    .catch(next);
}

function deleteUser(req, res, next) {
  User.findByIdAndRemove(req.params.id)
    .then((response) => res.send(response))
    .catch((err) => next(err));
}
