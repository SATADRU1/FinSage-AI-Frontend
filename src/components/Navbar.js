// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import "../styles/Navbar.css"

const Navbar = ({ user, openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState('transparent');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBackground('rgba(0, 0, 0, 0.9)');
      } else {
        setNavbarBackground('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar" style={{ backgroundColor: navbarBackground }}>
      <div className="container">
        <Link to="/" className="navbar-brand">World Class Financial Advisor</Link>
        <button className="navbar-toggle" aria-label="Toggle navigation" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <a href="#services" className="nav-link" onClick={closeMenu}>Services</a>
          <a href="#stock" className="nav-link" onClick={closeMenu}>Stock</a>
          <a href="#real-estate" className="nav-link" onClick={closeMenu}>Real Estate</a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
          <a href="#alerts" className="nav-link" onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bell-icon">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
          </a>
          {user ? (
            <>
              <Link to="/chat" className="nav-link chat-link" onClick={closeMenu}>Chat</Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <button onClick={openModal} className="login-button">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
