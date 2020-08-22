const jwt = require('jsonwebtoken');
const config = require('config');
const { User, validate } = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const sendMail = require('../mailer/NewAccount');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('That user already exisits!');
  } else {
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    sendMail(req.body.email, req.body.name)
      .then(async () => {
        console.log('Everything went well');
      })
      .catch((err) => {
        console.log(err);
      });
    res.header('x-auth-token', token);
    res.send(_.pick(user, ['_id', 'name', 'email']));
  }
});

module.exports = router;
