import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

import { FaHome, FaBook, FaUser, FaVideo, FaShieldAlt, FaBell } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-text">SHIELD</span>
        </Link>

        {/* Alerts Shortcut (still protected) */}
        <Link 
          to={user ? "/alerts" : "/auth?mode=login"}
          className="nav-link"
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              navigate('/auth?mode=login', { state: { message: 'Please log in to send alerts' } });
            }
          }}
        >
          <FaBell style={{ marginRight: "6px" }} />
          Alerts
        </Link>
        
        {/* Nav */}
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <FaHome style={{ marginRight: "6px" }} /> Home
            </Link>
            
            {/* ✅ Modules Link */}
            <Link 
              to={user ? "/courses" : "/auth?mode=login"}
              className="nav-link"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  navigate('/auth?mode=login', { state: { message: 'Please log in to view all courses' } });
                }
              }}
            >
              <FaBook style={{ marginRight: "6px" }} /> Modules
            </Link>

            <Link to="/quizzes" className="nav-link">Quizzes</Link>

            {/* ✅ Gamified Learning */}
            <Link
              to={user ? "/gamified-learning" : "/auth?mode=login"}
              className="nav-link"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  navigate('/auth?mode=login', { state: { message: 'Please log in to access gamified learning' } });
                }
              }}
            >
              <FaVideo style={{ marginRight: "6px" }} /> Gamified Learning
            </Link>

            {/* ✅ Emergency Toolkit (No login required) */}
            <Link to="/toolkit" className="nav-link">
              <FaShieldAlt style={{ marginRight: "6px" }} /> Emergency Toolkit
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="nav-link">
                  <FaUser style={{ marginRight: "6px" }} /> Profile
                </Link>
                <button onClick={logout} className="nav-link btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/auth?mode=login" className="btn btn-secondary">Log in</Link>
                <Link to="/auth?mode=signup" className="btn btn-primary">Sign up</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;