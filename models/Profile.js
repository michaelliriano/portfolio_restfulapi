const mongoose = require('mongoose');
const { required } = require('joi');
const { truncate } = require('lodash');

mongoose.set('useCreateIndex', true);
const profiles = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
      type: String,
      required: true
  },
  bio: {
      type: String,
      required: truncate
  },
  yearsOfExperience: {
      type: Number,
      required: true
  },
  projects:{
      type: Array,
      required: true
  },

  github: {
      type: String,
      required: true
  },
  website: {
      type: String,
      required: true
  },
  education: {
      type: Array,
      required: true
  },
  hobbies: {
      type: Array,
      required: true
  },
  email: {
    type: String,
    required: true,
  },
  date: Date,
});

module.exports = mongoose.model('Profile', profiles);
