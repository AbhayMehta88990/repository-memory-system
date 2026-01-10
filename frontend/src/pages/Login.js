import React from 'react';
import { FiGithub, FiFolder } from 'react-icons/fi';
import '../styles/Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = ({ onLogin }) => {
  const handleDemoRepo = () => {
    onLogin();
  };

  const handleGitHubLogin = () => {
    // Redirect to backend OAuth endpoint
    window.location.href = `${API_URL}/api/auth/github`;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Repository Memory System</h1>
          <p>AI-powered repository understanding and onboarding</p>
        </div>

        <div className="login-content card">
          <h2>Welcome</h2>
          <p className="login-description">
            Choose how you'd like to explore the Repository Memory System
          </p>

          <div className="login-options">
            <button className="login-option demo" onClick={handleDemoRepo}>
              <div className="option-icon">
                <FiFolder />
              </div>
              <div className="option-content">
                <h3>Try Demo Repository</h3>
                <p>Explore with our pre-loaded e-commerce API example</p>
                <span className="option-badge active">Available Now</span>
              </div>
            </button>

            <button className="login-option github" onClick={handleGitHubLogin}>
              <div className="option-icon">
                <FiGithub />
              </div>
              <div className="option-content">
                <h3>Connect with GitHub</h3>
                <p>Analyze any repository you have access to</p>
                <span className="option-badge github-ready">Ready</span>
              </div>
            </button>
          </div>

          <div className="login-info">
            <p>
              <strong>Demo Mode:</strong> Uses a test repository to showcase all features.
              <strong> GitHub Mode:</strong> Connect your GitHub account to analyze your own repositories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
