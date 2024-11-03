import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import "./Signup.css"
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
const baseUrl = import.meta.env.VITE_BASE_URL;

const SignupForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types in the input
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Handle form submission logic
    try {
      const response = await axios.post(`${baseUrl}/register`, formData);
     // Success message
     toast.success('User created successfully!', {
        position: "top-center", // Position at top center
        autoClose: 500,
        
        onClose: () => {
          // Navigate to login page after the toast is closed
          navigate('/login');
        },
      }) 
      
    } catch (error) {
      if (error.response) {
        console.log(error);
        
        toast.error(error.response.data.message || 'Something went wrong!', {
          position: "top-center", // Position at top center
        })
        setError(error.response.data.message || 'Something went wrong!');
      } else {
       
        toast.error('Server error, please try again later.');
        setError('Server error, please try again later.');
      }
    }
    finally{
      setLoading(false); 
        }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
   
    <div className='w-100 h-100 bg-light'>
    <div id="login-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={handleChange}
            id="username"
            name="username"
            required
          />
        </div>
        
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            value={formData.mobile}
            onChange={handleChange}
            id="mobile"
            name="mobile"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            name="password"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              id="confirmPassword"
              name="confirmPassword"
              required
              className="form-control"
              style={{ paddingRight: '2.5rem' }} // Adjust padding to make space for the icon
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '-3px',
                top: '40%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              {/* <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}>0</i> */}
              {/* {`${showPassword? <img src={show} alt="" /> : <img src={hide} alt="" />}`} */}
             </button>
          </div>
        </div>

        {error && <p style={{ color: '#2b14f7' }}>{error}</p>} {/* Display error message */}

        <button className='btn btn-success w-100 mb-2 ' type="submit" style={{background:"#0af086"}}>{loading ? <ClipLoader size={20} color="#fff" /> : 'Submit'}</button>
        {/* <button type="submit" style={{background:"#0af086"}} className="btn w-100 mb-2">Submit</button> */}
        <span className='ml-3  '> Already have an account? <a href="/login">login</a></span>
    
      </form>
    </div>
    <ToastContainer /> {/* Toast container to render the notifications */}
 
    </div>
    
    </>
  );
};

export default SignupForm;
