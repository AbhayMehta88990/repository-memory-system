import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import FeatureUnavailable from '../components/FeatureUnavailable';
import { getStarterTasks } from '../services/api';
import '../styles/StarterTasks.css';

const StarterTasks = ({ analysisData, isGitHubMode = false }) => {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Skip fetching if in GitHub mode
    if (isGitHubMode) {
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await getStarterTasks();
        setTasks(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setError('Failed to load starter tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isGitHubMode]);

  // Show unavailable state for GitHub mode
  if (isGitHubMode) {
    return (
      <FeatureUnavailable
        title="Starter Tasks"
        featureName="Personalized starter task recommendations"
      />
    );
  }

  const toggleTaskCompletion = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter(i => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  if (loading) {
    return (
      <div className="tasks-loading">
        <LoadingSpinner />
        <p>Loading starter tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tasks-error card">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="tasks-empty card">
        <h2>No tasks available</h2>
        <p>Unable to generate starter tasks at this time.</p>
      </div>
    );
  }

  const completionPercentage = (completedTasks.length / tasks.length) * 100;

  return (
    <div className="starter-tasks">
      <div className="tasks-header">
        <h1>Starter Tasks</h1>
        <p>Beginner-friendly tasks to help you get started</p>
      </div>

      {/* Progress Card */}
      <div className="progress-card card">
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-value">{completedTasks.length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat">
            <span className="stat-value">{tasks.length - completedTasks.length}</span>
            <span className="stat-label">Remaining</span>
          </div>
          <div className="stat">
            <span className="stat-value">{Math.round(completionPercentage)}%</span>
            <span className="stat-label">Progress</span>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="tasks-list">
        {tasks.map((task, index) => {
          const isCompleted = completedTasks.includes(index);

          return (
            <div
              key={index}
              className={`task-card card ${isCompleted ? 'completed' : ''}`}
            >
              <div className="task-header">
                <button
                  className="task-checkbox"
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {isCompleted ? (
                    <FiCheckCircle className="check-icon checked" />
                  ) : (
                    <FiCircle className="check-icon" />
                  )}
                </button>
                <h3 className="task-title">{task.title}</h3>
                {task.difficulty && (
                  <span className={`difficulty-badge ${task.difficulty.toLowerCase()}`}>
                    {task.difficulty}
                  </span>
                )}
              </div>

              <p className="task-description">{task.description}</p>

              {task.files && task.files.length > 0 && (
                <div className="task-files">
                  <span className="files-label">Files:</span>
                  {task.files.map((file, idx) => (
                    <code key={idx} className="file-tag">
                      {typeof file === 'string' ? file : file.path || file.name}
                    </code>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StarterTasks;
