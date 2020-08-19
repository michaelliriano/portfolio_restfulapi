const mongoose = require('mongoose');

const projects = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  tools: {
    type: Array,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  date: Date,
});

module.exports = mongoose.model('Project', projects);
