import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OnboardingTour from './pages/OnboardingTour';
import ChatInterface from './pages/ChatInterface';
import StarterTasks from './pages/StarterTasks';
import AuthCallback from './pages/AuthCallback';

// Components
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

// Services
import { analyzeRepository } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [githubUser, setGithubUser] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing GitHub auth on mount
  useEffect(() => {
    const token = localStorage.getItem('github_token');
    const userStr = localStorage.getItem('github_user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setGithubUser(user);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        localStorage.removeItem('github_token');
        localStorage.removeItem('github_user');
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !analysisData) {
      const initializeApp = async () => {
        try {
          setLoading(true);
          console.log('Attempting to fetch repository data...');
          const response = await analyzeRepository();
          console.log('Repository data received:', response);
          setAnalysisData(response.data);
          setError(null);
        } catch (err) {
          console.error('Failed to analyze repository:', err);
          console.error('Error details:', err.message);
          if (err.code === 'ECONNABORTED') {
            setError('Request timeout. Backend may be starting up. Please wait 30 seconds and refresh.');
          } else if (err.message.includes('Network Error')) {
            setError('Cannot connect to backend. Please check the API URL in environment variables.');
          } else {
            setError(`Failed to load repository data: ${err.message}`);
          }
        } finally {
          setLoading(false);
        }
      };

      initializeApp();
    }
  }, [isAuthenticated, analysisData]);

  const handleAuthSuccess = (authData) => {
    setGithubUser(authData.user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    localStorage.removeItem('github_user');
    setGithubUser(null);
    setIsAuthenticated(false);
    setAnalysisData(null);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/auth/callback" element={<AuthCallback onAuthSuccess={handleAuthSuccess} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner />
        <p>Analyzing codebase...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Header githubUser={githubUser} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard analysisData={analysisData} />} />
            <Route path="/tour" element={<OnboardingTour analysisData={analysisData} />} />
            <Route path="/chat" element={<ChatInterface analysisData={analysisData} />} />
            <Route path="/tasks" element={<StarterTasks analysisData={analysisData} />} />
            <Route path="/auth/callback" element={<AuthCallback onAuthSuccess={handleAuthSuccess} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
