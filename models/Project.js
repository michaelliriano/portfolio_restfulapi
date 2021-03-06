const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

mongoose.set('useCreateIndex', true);
const projects = new mongoose.Schema({
  id: {
    type: ObjectId,
  },
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
  github: {
    type: String,
    required: true,
  },
  live: {
    type: String,
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
