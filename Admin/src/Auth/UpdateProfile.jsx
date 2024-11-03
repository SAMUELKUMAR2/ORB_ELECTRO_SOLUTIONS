import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: user || '',
    email: '',
    mobile: '',
    profilePhoto: null
  });

  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${id}`);
        const { username, email, mobile } = response.data;
      
        setFormData({
          username: username || '',
          email: email || '',
          mobile: mobile || '',
          profilePhoto: null
        });
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data?.error || error.message);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleUpdate = async (field) => {
    const endpointMap = {
      username: '/api/user/update/username',
      email: '/api/user/update/email',
      mobile: '/api/user/update/mobile',
    };
    try {
      const response = await axios.put(endpointMap[field], {
        userId: id,
        [field]: formData[field]
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.error || 'Error updating field');
    }
  };

  const handlePhotoUpload = async () => {
    if (formData.profilePhoto) {
      const formDataToUpload = new FormData();
      formDataToUpload.append("profilePhoto", formData.profilePhoto);
      formDataToUpload.append("userId", id);

      try {
        const response = await axios.put('/api/user/update/profile-photo', formDataToUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(response.data.message);
      } catch (error) {
        console.error(error.response?.data?.error || 'Error uploading profile photo');
      }
    }
  };

  return (
    <div className="col-8 offset-2 mt-5">
      <h2>Update Profile</h2>

      {/* Username Field */}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
        />
        <button 
          type="button" 
          className="btn btn-primary mt-2" 
          onClick={() => handleUpdate('username')}
        >
          Update Username
        </button>
      </div>

      {/* Email Field */}
      <div className="form-group mt-4">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
        <button 
          type="button" 
          className="btn btn-primary mt-2" 
          onClick={() => handleUpdate('email')}
        >
          Update Email
        </button>
      </div>

      {/* Mobile Field */}
      <div className="form-group mt-4">
        <label htmlFor="mobile">Mobile Number:</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="form-control"
        />
        <button 
          type="button" 
          className="btn btn-primary mt-2" 
          onClick={() => handleUpdate('mobile')}
        >
          Update Mobile Number
        </button>
      </div>

      {/* Profile Photo Upload */}
      <div className="form-group mt-4">
        <label htmlFor="profilePhoto">Profile Photo:</label>
        <input
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          onChange={handleChange}
          className="form-control"
        />
        <button 
          type="button" 
          className="btn btn-primary mt-2" 
          onClick={handlePhotoUpload}
        >
          Update Profile Photo
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
