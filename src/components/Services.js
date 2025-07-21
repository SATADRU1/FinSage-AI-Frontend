// components/Services.js
import React from 'react';

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <span className="icon-dollar">$</span>
            </div>
            <h3>Investment Planning</h3>
            <p>Detailed investment strategies aligned with your goals and risk tolerance.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <span className="icon-chart">📈</span>
            </div>
            <h3>Stock Trading</h3>
            <p>Expert guidance on stock market investments and portfolio management.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <span className="icon-home">🏠</span>
            </div>
            <h3>Real Estate</h3>
            <p>Comprehensive real estate investment strategies and market analysis.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;