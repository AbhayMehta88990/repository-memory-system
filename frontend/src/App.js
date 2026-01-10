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
import RepoSelector from './pages/RepoSelector';

// Components
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

// Services
import { analyzeRepository, getRepoStats } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGitHubMode, setIsGitHubMode] = useState(false);
  const [githubUser, setGithubUser] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing GitHub auth on mount
  useEffect(() => {
    const token = localStorage.getItem('github_token');
    const userStr = localStorage.getItem('github_user');
    const repoStr = localStorage.getItem('selected_repo');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setGithubUser(user);
        setIsAuthenticated(true);
        setIsGitHubMode(true);

        if (repoStr) {
          const repo = JSON.parse(repoStr);
          setSelectedRepo(repo);
        }
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        localStorage.removeItem('github_token');
        localStorage.removeItem('github_user');
        localStorage.removeItem('selected_repo');
      }
    }
  }, []);

  // Fetch analysis data when authenticated
  useEffect(() => {
    const initializeApp = async () => {
      // For demo mode, fetch mock data
      if (isAuthenticated && !isGitHubMode && !analysisData) {
        try {
          setLoading(true);
          const response = await analyzeRepository();
          setAnalysisData(response.data);
          setError(null);
        } catch (err) {
          console.error('Failed to analyze repository:', err);
          if (err.code === 'ECONNABORTED') {
            setError('Request timeout. Backend may be starting up. Please wait 30 seconds and refresh.');
          } else if (err.message.includes('Network Error')) {
            setError('Cannot connect to backend. Please check the API URL.');
          } else {
            setError(`Failed to load repository data: ${err.message}`);
          }
        } finally {
          setLoading(false);
        }
      }

      // For GitHub mode with selected repo, fetch repo stats
      if (isAuthenticated && isGitHubMode && selectedRepo && !analysisData) {
        try {
          setLoading(true);
          const response = await getRepoStats(selectedRepo.full_name);
          setAnalysisData(response.data);
          setError(null);
        } catch (err) {
          console.error('Failed to fetch repo stats:', err);
          setError('Failed to load repository statistics.');
        } finally {
          setLoading(false);
        }
      }
    };

    initializeApp();
  }, [isAuthenticated, isGitHubMode, selectedRepo, analysisData]);

  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    setIsGitHubMode(false);
  };

  const handleAuthSuccess = (authData) => {
    setGithubUser(authData.user);
    setIsAuthenticated(true);
    setIsGitHubMode(true);
  };

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
    localStorage.setItem('selected_repo', JSON.stringify(repo));
    setAnalysisData(null); // Reset to trigger fetch
  };

  const handleChangeRepo = () => {
    setSelectedRepo(null);
    setAnalysisData(null);
    localStorage.removeItem('selected_repo');
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    localStorage.removeItem('github_user');
    localStorage.removeItem('selected_repo');
    setGithubUser(null);
    setIsAuthenticated(false);
    setIsGitHubMode(false);
    setSelectedRepo(null);
    setAnalysisData(null);
  };

  // Not authenticated - show login
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleDemoLogin} />} />
          <Route path="/auth/callback" element={<AuthCallback onAuthSuccess={handleAuthSuccess} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  // GitHub mode but no repo selected - show repo selector
  if (isGitHubMode && !selectedRepo) {
    return (
      <Router>
        <div className="app">
          <Header githubUser={githubUser} onLogout={handleLogout} />
          <main className="main-content">
            <RepoSelector onRepoSelect={handleRepoSelect} githubUser={githubUser} />
          </main>
        </div>
      </Router>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner />
        <p>Analyzing codebase...</p>
      </div>
    );
  }

  // Error state
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
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  analysisData={analysisData}
                  isGitHubMode={isGitHubMode}
                  selectedRepo={selectedRepo}
                  onChangeRepo={isGitHubMode ? handleChangeRepo : undefined}
                />
              }
            />
            <Route
              path="/tour"
              element={
                <OnboardingTour
                  analysisData={analysisData}
                  isGitHubMode={isGitHubMode}
                />
              }
            />
            <Route
              path="/chat"
              element={
                <ChatInterface
                  analysisData={analysisData}
                  isGitHubMode={isGitHubMode}
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <StarterTasks
                  analysisData={analysisData}
                  isGitHubMode={isGitHubMode}
                />
              }
            />
            <Route path="/auth/callback" element={<AuthCallback onAuthSuccess={handleAuthSuccess} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
