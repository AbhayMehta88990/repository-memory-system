import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OnboardingTour from './pages/OnboardingTour';
import ChatInterface from './pages/ChatInterface';
import StarterTasks from './pages/StarterTasks';

// Components
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

// Services
import { analyzeRepository } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && !analysisData) {
      const initializeApp = async () => {
        try {
          setLoading(true);
          const response = await analyzeRepository();
          setAnalysisData(response.data);
          setError(null);
        } catch (err) {
          console.error('Failed to analyze repository:', err);
          setError('Failed to load repository data. Please check if the backend is running.');
        } finally {
          setLoading(false);
        }
      };

      initializeApp();
    }
  }, [isAuthenticated, analysisData]);

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
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
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard analysisData={analysisData} />} />
            <Route path="/tour" element={<OnboardingTour analysisData={analysisData} />} />
            <Route path="/chat" element={<ChatInterface analysisData={analysisData} />} />
            <Route path="/tasks" element={<StarterTasks analysisData={analysisData} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
