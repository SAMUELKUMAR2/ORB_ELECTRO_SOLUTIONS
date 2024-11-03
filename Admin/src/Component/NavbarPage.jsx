import React from 'react';
import { useAuth } from '../Auth/AuthContext.jsx';
import './Navbar.css'
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <span className="ms-2 fw-bold text-primary">ORB ELECRO SOLUTIONS</span>
        </a>
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
            <li className="nav-item fw-bold">
              <a className="nav-link text-secondary" href="/">Home</a>
            </li>
            <li className="nav-item fw-bold">
              <a className="nav-link text-secondary" href="/">All Products</a>
            </li>
            <li className="nav-item fw-bold">
              <a className="nav-link text-secondary" href="/products/additem">Add Product Item</a>
            </li>
            <li className="nav-item fw-bold">
              <a className="nav-link text-secondary" href="/products/orders">Order Details</a>
            </li>
            <li className="nav-item fw-bold">
              <a className="nav-link text-secondary" href="/products/payments">Payment Details</a>
            </li>
            <li className="nav-item fw-bold">
              <a className="nav-link text-secondary" href="/admin/profile">Update Profile</a>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="username px-3 py-2 me-3 text-white bg-primary rounded">
                  {user}
                </span>
                <button 
                  className="btn btn-danger" 
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/admin/login" className="me-2">
                  <button className="btn btn-outline-primary" type="button">
                    Sign In
                  </button>
                </a>
                <a href="/admin/register">
                  <button className="btn btn-primary" type="button">
                    Sign Up
                  </button>
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
