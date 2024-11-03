// src/models/User.js

const mongoose = require('mongoose');
const validator = require('validator');

// Create a User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username must not exceed 30 characters'],
    trim: true,
    unique:false,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique:true,
    validate: {
      validator: function (v) {
        return /^(?=.*\d).{10,15}$/.test(v); // Adjust regex as per your mobile number requirements
      },
      message: 'Mobile number must be between 10 to 15 digits',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [3, 'Password must be at least 6 characters long'],
  }
});

// Create a User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
