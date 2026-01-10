import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000
});

/**
 * Analyze repository
 */
export const analyzeRepository = async () => {
  const response = await api.get('/api/repo/analyze');
  return response.data;
};

/**
 * Get file details
 */
export const getFileDetails = async (filePath) => {
  const response = await api.get(`/api/repo/file/${filePath}`);
  return response.data;
};

/**
 * Generate onboarding tour
 */
export const generateTour = async (role = null) => {
  const response = await api.post('/api/ai/generate-tour', { role });
  return response.data;
};

/**
 * Ask question about codebase
 */
export const askQuestion = async (question) => {
  const response = await api.post('/api/ai/ask', { question });
  return response.data;
};

/**
 * Get starter tasks
 */
export const getStarterTasks = async () => {
  const response = await api.get('/api/ai/starter-tasks');
  return response.data;
};

/**
 * Verify GitHub token
 */
export const verifyGitHubToken = async (token) => {
  const response = await api.get('/api/auth/verify', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Get user's GitHub repositories
 */
export const getUserRepos = async () => {
  const token = localStorage.getItem('github_token');
  if (!token) {
    throw new Error('No GitHub token found');
  }

  const response = await api.get('/api/auth/user/repos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Get repository statistics from GitHub
 */
export const getRepoStats = async (repoFullName) => {
  const token = localStorage.getItem('github_token');
  if (!token) {
    throw new Error('No GitHub token found');
  }

  const response = await api.get(`/api/auth/repo/${encodeURIComponent(repoFullName)}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;
