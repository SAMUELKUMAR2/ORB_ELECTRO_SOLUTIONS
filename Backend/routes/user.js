// src/routes/user.js

const express = require('express');
const User = require('../model/user.js');

const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
  const { username, email, mobile, password } = req.body;
  console.log("u=",username);
  
  console.log(req.body);
  
 
//   try {
//     const newUser = new User({ username, email, mobile, password });
//     await newUser.save();
//     res.status(201).send({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       return res.status(400).send({ message: error.message });
//     }
//     res.status(500).send({ message: 'Server error' });
//   }
});

module.exports = router;
