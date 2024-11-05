const express = require('express');
const router = express.Router();
const Client = require('../model/Client')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { username, email, mobile, password } = req.body;  
try {
 // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new Client({
        username,
        email,
        mobile,
        password: hashedPassword
    });

    await newUser.save();
    
    res.status(201).json({ message: 'Client registered successfully' });

} catch (error) {
    console.log(error);
      
    if (error.name === 'ValidationError') {
     
      
      return res.status(400).send({ message: error.message });
    }
    else if (error.code === 11000 && error.keyValue.email) {
      return res.status(400).send({ message: 'This email address is already registered.' });
    }else if (error.keyValue.mobile) {
      return res.status(400).send({ message: 'This mobile number is already registered.' });
    }
}
})

// Client Login
router.post("/login",async(req,res)=>{

  const {email,password} = req.body;
  try {
    // Find user by email
    const user = await Client.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'email does not exist!' });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '2d' });
    
    res.status(200).json({ message: 'Login successful', token, username: user.username });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
})

module.exports = router;