// components/LoginModal.js
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        console.log("Attempting login with:", formData.email);
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("Login successful:", userCredential.user);
        
        setIsLoading(false);
        onClose();
        navigate('/chat');
      } else {
        // Sign up
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        // Create user in Firebase Auth
        console.log("Attempting signup with:", formData.email);
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        console.log("Signup successful:", userCredential.user);

        // Store additional user data in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });

        setIsLoading(false);
        onClose();
        navigate('/chat');
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message || 'An error occurred during authentication');
      setIsLoading(false);
    }
  };

  // Prevent modal from handling clicks if it's not open
  if (!isOpen) return null;

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`} 
      id="loginModal"
      onClick={(e) => {
        // Close modal when clicking outside
        if (e.target.className.includes('modal-overlay')) {
          onClose();
        }
      }}
    >
      <div className="login-modal">
        <button className="close-modal" aria-label="Close modal" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="modal-header">
          <div className="modal-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6d28d9" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h2>{isLogin ? 'Login to Your Account' : 'Create New Account'}</h2>
          <p className="modal-subtitle">Access your AI financial assistant</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name"
                className="form-input" 
                placeholder="Enter your full name" 
                name="name"
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              id="email" 
              className="form-input" 
              placeholder="Enter your email" 
              name="email"
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              id="password" 
              className="form-input" 
              placeholder="Enter your password" 
              name="password"
              required 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password"
                id="confirmPassword" 
                className="form-input" 
                placeholder="Confirm your password" 
                name="confirmPassword"
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}
          
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        
        <div className="login-options">
          <p style={{ color: 'var(--light-text)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="link-button" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;