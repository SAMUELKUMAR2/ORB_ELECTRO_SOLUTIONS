
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import { ClipLoader } from 'react-spinners';
const baseUrl = import.meta.env.VITE_BASE_URL;

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [userType, setUserType] = useState('Client'); // Default to 'Client'
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUserTypeChange = (event) => {
        setUserType(event.target.checked ? 'Admin' : 'Client');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types in the input
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
          console.log(userType);
           
          console.log(formData);
          
            const response = await axios.post(`${baseUrl}/login`, formData);
            console.log(response);
            
            // Show success toast
            toast.success('Login successful!', {
                position: "top-center",
                autoClose: 1000,
                onClose: () => {
                    const { token, username } = response.data;
                    localStorage.setItem('token', token); // Store token for authenticated requests
                    // localStorage.setItem('username', username); // Store username
                    login(username);
                  
                    
                    navigate('/');
                }
            });

        } catch (error) {
            // Handle error response
            if (error.response) {
                const errorMessage = error.response.data.message || 'Something went wrong!';
                toast.error(errorMessage, {
                    position: "top-center"
                });
                setError(errorMessage);
            }
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary-subtle" style={{ height: "calc(100vh - 75px)" }}>
            <div className="col-10 col-md-8 col-lg-4 shadow-lg">
                <div className="card shadow card-mobile">
                    <div className="card-header">
                        <h5 className="card-title">Login as {userType}</h5>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="userTypeSwitch"
                                checked={userType === 'Admin'}
                                onChange={handleUserTypeChange}
                            />
                            <label className="form-check-label" htmlFor="userTypeSwitch">
                                {userType}
                            </label>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && <p style={{ color: '#2b14f7' }}>{error}</p>} {/* Display error message */}
                            
                            <button type="submit" style={{ background: "#0af086" }} className="btn btn-success w-100 mb-2">
                                {loading ? <ClipLoader size={20} color="#fff" /> : 'Login'}
                            </button>
                            <span className='ml-3'> Don't have an account? <a href="/signup">Register</a></span>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;

