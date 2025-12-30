import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/dashboard" className="logo">
          <span className="logo-text">Repository Memory System</span>
        </Link>

        <nav className="nav">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/tour" 
            className={`nav-link ${isActive('/tour') ? 'active' : ''}`}
          >
            Onboarding Tour
          </Link>
          <Link 
            to="/chat" 
            className={`nav-link ${isActive('/chat') ? 'active' : ''}`}
          >
            Ask Questions
          </Link>
          <Link 
            to="/tasks" 
            className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
          >
            Starter Tasks
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
