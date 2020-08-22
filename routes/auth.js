const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/User');
const express = require('express');
const router = express.Router();

router.post('/auth', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Incorrect email or password.');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Incorrect email or password.');
  }

  const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
