// components/Hero.js
import React from 'react';

const Hero = ({ openModal }) => {
  const scrollToNextSection = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <h1 className="hero-text">
          Invest. Grow.<br />Achieve.
        </h1>
        <p className="hero-subtext">
          Your trusted partner in financial growth and success
        </p>
        <div className="cta-buttons">
          <button onClick={openModal} className="cta-button primary">Start Investing</button>
          <button className="cta-button secondary">Learn More</button>
        </div>
      </div>
      <div className="scroll-indicator" onClick={scrollToNextSection}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default Hero;