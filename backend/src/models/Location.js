const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

module.exports = Location
