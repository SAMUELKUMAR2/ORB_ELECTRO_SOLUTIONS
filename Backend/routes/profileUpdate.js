const express = require('express');
const multer = require('multer');
const Admin = require('../model/Admin'); 
const bcrypt = require('bcryptjs');
const router = express.Router();




// Configure multer for file uploads (profile photo)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define a directory for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Get user by ID
router.get("/:id",async (req, res) => {
  
  try {
    const user = await Admin.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update username
router.put('/update/username', async (req, res) => {
  try {
    const { userId, username } = req.body;
    const user = await Admin.findByIdAndUpdate(userId, { username }, { new: true });
    res.json({ message: 'Username updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating username' });
  }
});

// Update email
router.put('/update/email', async (req, res) => {
  try {
    const { userId, email } = req.body;
    const user = await Admin.findByIdAndUpdate(userId, { email }, { new: true });
    res.json({ message: 'Email updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating email' });
  }
});



// Update profile photo
router.put('/update/profile-photo', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { userId } = req.body;
    const profilePhotoPath = req.file.path;

    const user = await Admin.findByIdAndUpdate(userId, { profilePhoto: profilePhotoPath }, { new: true });
    res.json({ message: 'Profile photo updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading profile photo' });
  }
});

module.exports = router;
