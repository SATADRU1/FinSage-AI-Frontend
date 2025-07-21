import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './styles/App.css';

// Component imports
import LoginModal from './components/LoginModal';
import ChatPage from './components/ChatPage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="*" element={
          <AppContent 
            openModal={openModal} 
            isModalOpen={isModalOpen} 
            closeModal={closeModal}
            user={user}
          />
        } />
      </Routes>
    </Router>
  );
}

function AppContent({ openModal, isModalOpen, closeModal, user }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="App">
      <Navbar user={user} openModal={openModal} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage openModal={openModal} user={user} />
            }
          />
          <Route
            path="/chat"
            element={user ? <ChatPage user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/chat" />
              ) : (
                <HomePage openModal={openModal} user={user} />
              )
            }
          />
        </Routes>
      </main>
      
      {isHomePage && <Footer />}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

function HomePage({ openModal, user }) {
  return (
    <>
      <Hero openModal={openModal} />
      <Services />
      <Contact />
    </>
  );
}

export default App;
