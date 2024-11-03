
import React from 'react';
import './AboutUs.css'; // Optional: CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us container ">
      <h1 className="text-center">About Us</h1>
      <p className="lead text-center">
        Welcome to ORB Electro Solutions, where we offer the best in electrical solutions
        tailored to your needs. Our team of experts is dedicated to providing top-notch
        service and quality products to ensure your satisfaction.
      </p>
      <div className="row mt-5">
        <div className="col-md-6 text-center">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver reliable and innovative electrical solutions
            that empower individuals and businesses to succeed.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <h2>Our Vision</h2>
          <p>
            We envision a world where our electrical solutions make life easier,
            safer, and more efficient for everyone.
          </p>
        </div>
      </div>
      <div className="text-center mt-5">
        <h2>Why Choose Us?</h2>
        <ul className="list-unstyled">
          <li>✔️ Quality Products</li>
          <li>✔️ Exceptional Customer Service</li>
          <li>✔️ Experienced Professionals</li>
          <li>✔️ Competitive Pricing</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
