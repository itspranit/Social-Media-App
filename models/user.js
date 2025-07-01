const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // define your schema fields here
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // add other fields if needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
