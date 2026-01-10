import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiLogOut, FiGithub } from 'react-icons/fi';
import '../styles/Header.css';

const Header = ({ githubUser, onLogout }) => {
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

        <div className="header-user">
          {githubUser ? (
            <div className="user-profile">
              <a
                href={githubUser.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="user-info"
              >
                <img
                  src={githubUser.avatar_url}
                  alt={githubUser.name}
                  className="user-avatar"
                />
                <span className="user-name">{githubUser.name || githubUser.login}</span>
              </a>
              <button onClick={onLogout} className="logout-button" title="Logout">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="demo-badge">
              <FiGithub />
              <span>Demo Mode</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
