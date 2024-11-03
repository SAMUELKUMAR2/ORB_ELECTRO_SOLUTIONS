const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const wrapAsync = require('./utils/wrapAsync');
require('dotenv').config();

// Configure Cloudinary with your account credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});



// Function to upload to Cloudinary and delete local file
const uploadToCloudinary = async (filePath, folder) => {
  try {
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder || 'ORM' // Set a default folder or specify in the call
    });

    // Delete local file after uploading to Cloudinary
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Failed to delete local file:', err);
      } else {
        console.log('Local file deleted successfully');
      }
    });
  } catch (error) {
    console.log("error during unlink");
    
  }

    // Return Cloudinary upload result
    return result;
  } catch (error) {
    // Delete local file in case of an error as well
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete local file after error:', err);
    });

    // Rethrow error to handle in main route
    throw error;
  }
};

module.exports = uploadToCloudinary;