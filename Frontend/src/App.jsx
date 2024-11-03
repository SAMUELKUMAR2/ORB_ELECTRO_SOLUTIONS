import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Container/Layout/NavbarPage.jsx';
import HomePage from "./Container/Layout/HomePage.jsx"
import Footer from './Container/Layout/Footer.jsx';
import AboutUs from './Container/Layout/AboutUs.jsx';


import { AuthProvider } from './Auth/AuthContext.jsx';
import Login from './Auth/Login.jsx';
import Signup from './Auth/Signup.jsx';
import ProductDetail from './Container/Products/ProductDetail.jsx';
import Checkout from './Container/Checkout/Checkout.jsx';
import OrderDetails from './Container/Checkout/OrderDetails.jsx';
import ThankYou from './Container/Checkout/ThankYouPage.jsx';
import ContactUs from './Container/Layout/ContactUs.jsx';

function App() {
  return (
    <AuthProvider>
       <Router>
        <Navbar />
      <Routes>
        {/* Route for the Product List */}
        <Route path="/" element={<HomePage/>} />
      
        <Route path="/login" element = {<Login />} />

        <Route path="/signup" element = {<Signup />} />

        <Route path="/about" element = {<AboutUs />} />

        <Route path="/contact" element = {<ContactUs />} />
        
        {/* Route for Product Details */}
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/products/:id/buy" element={<Checkout />} />
        {/* Order Details */}
        <Route path="/products/order/:id" element={<OrderDetails />} />
      
      {/* Thankyou page */}
      <Route path="/products/api/order/:id/thankyou" element={<ThankYou />} />
      </Routes>
      <div>
        <Footer />
       </div>
    </Router>
    </AuthProvider>
   
  );
}

export default App;
