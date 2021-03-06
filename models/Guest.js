const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const guests = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  date: Date,
});

module.exports = mongoose.model('Guests', guests);
