import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
export const generateTour = async () => {
  const response = await api.post('/api/ai/generate-tour');
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

export default api;
