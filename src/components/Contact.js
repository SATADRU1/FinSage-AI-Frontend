// components/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Message sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea 
              name="message" 
              placeholder="Your Message" 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="send-message-button">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
