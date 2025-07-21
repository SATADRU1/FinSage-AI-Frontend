// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>World Class Financial Advisor</h3>
            <p>Your trusted partner in financial growth and success.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>Email: info@financialadvisor.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Finance St, New York, NY</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} World Class Financial Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;