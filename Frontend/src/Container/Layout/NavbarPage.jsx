// src/Container/NavbarPage.js
import React from 'react';
import './NavbarPage.css';

import { useAuth } from '../../Auth/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">ORB ELECRO SOLUTIONS</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link nav-text" href="/">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-text" href="/about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-text" href="/contact">Contact</a>
            </li>
          </ul>
          <div className="d-flex ">
            {user ? (
              <>
                <span className='username '>{user}</span>
                <button className='btn btn-danger' onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <a href="/login">
                  <button className="btn btn-outline-info me-2 text-white" type="button">Sign In</button>
                </a>
                <a href="/signup">
                  <button className="btn btn-primary me-2" type="button">Sign Up</button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
