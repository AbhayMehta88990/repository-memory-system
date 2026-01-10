import React from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiFileText, FiLayers, FiGitBranch } from 'react-icons/fi';
import '../styles/Dashboard.css';

const Dashboard = ({ analysisData, isGitHubMode = false, selectedRepo = null }) => {
  if (!analysisData) {
    return <div>Loading...</div>;
  }

  const { summary, metadata, keyFiles } = analysisData;

  return (
    <div className="dashboard">
      {/* Demo Info Banner - Only show in demo mode */}
      {!isGitHubMode && (
        <div className="demo-info-banner card">
          <div className="demo-info-content">
            <h3>Demo Mode Active</h3>
            <p>
              Currently analyzing a <strong>test e-commerce API repository</strong> for demonstration purposes.
              This showcases how the system analyzes code structure, generates onboarding tours,
              and provides intelligent answers about the codebase.
            </p>
            <div className="demo-features">
              <span className="feature-tag">Test Repository</span>
              <span className="feature-tag">All Features Available</span>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Mode Banner */}
      {isGitHubMode && selectedRepo && (
        <div className="github-info-banner card">
          <div className="github-info-content">
            <div className="repo-indicator">
              <FiGitBranch />
              <span>Analyzing repository from your GitHub account</span>
            </div>
            <h3>{selectedRepo.full_name}</h3>
            {selectedRepo.description && (
              <p className="repo-description">{selectedRepo.description}</p>
            )}
          </div>
        </div>
      )}

      <div className="dashboard-header">
        <h1>Welcome to {summary.projectName}</h1>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid grid grid-3">
        <div className="stat-card">
          <div className="stat-value">{summary.totalFiles}</div>
          <div className="stat-label">Files</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{summary.totalLines.toLocaleString()}</div>
          <div className="stat-label">Lines of Code</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Object.keys(summary.languages).length}</div>
          <div className="stat-label">Languages</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions card">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/tour" className="action-card">
            <div className="action-icon">
              <FiLayers size={32} />
            </div>
            <h3>Start Onboarding Tour</h3>
            <p>Get a guided walkthrough of the codebase structure</p>
          </Link>

          <Link to="/chat" className="action-card">
            <div className="action-icon">
              <FiCode size={32} />
            </div>
            <h3>Ask Questions</h3>
            <p>Get AI-powered answers about the code</p>
          </Link>

          <Link to="/tasks" className="action-card">
            <div className="action-icon">
              <FiFileText size={32} />
            </div>
            <h3>View Starter Tasks</h3>
            <p>Find beginner-friendly tasks to get started</p>
          </Link>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-2">
        {/* Languages */}
        <div className="card">
          <h2>Languages Used</h2>
          <div className="languages-list">
            {Object.entries(summary.languages).map(([lang, count]) => (
              <div key={lang} className="language-item">
                <span className="language-name">{lang}</span>
                <span className="badge">{count} files</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Files */}
        <div className="card">
          <h2>Entry Points</h2>
          {keyFiles.entryPoints.length > 0 ? (
            <ul className="list-unstyled">
              {keyFiles.entryPoints.map((file, idx) => (
                <li key={idx} className="list-item">
                  <div className="file-name">{file.name}</div>
                  <div className="file-path">{file.path}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No entry points detected</p>
          )}
        </div>
      </div>

      {/* Code Statistics */}
      <div className="card">
        <h2>Code Statistics</h2>
        <div className="code-stats-container">
          <div className="stat-section">
            <div className="stat-header">
              <span className="stat-label">Functions</span>
              <span className="stat-count">{metadata.functions.length}</span>
            </div>
            <div className="stat-details">
              {metadata.functions.length > 0 ? (
                <>
                  {metadata.functions.slice(0, 5).map((func, idx) => (
                    <div key={idx} className="detail-item">
                      <span className="detail-name">{func.name}</span>
                      <span className="detail-file">{func.file}</span>
                    </div>
                  ))}
                  {metadata.functions.length > 5 && (
                    <div className="detail-item more">
                      <span className="detail-name">+{metadata.functions.length - 5} more functions</span>
                    </div>
                  )}
                </>
              ) : isGitHubMode ? (
                <div className="analysis-note">
                  <p>Function detection requires parsing source files, which is not available for GitHub repositories in this version. This feature works in demo mode where the codebase has been pre-analyzed.</p>
                </div>
              ) : (
                <div className="detail-item">
                  <span className="detail-name no-data">No functions detected</span>
                </div>
              )}
            </div>
          </div>

          <div className="stat-section">
            <div className="stat-header">
              <span className="stat-label">Classes</span>
              <span className="stat-count">{metadata.classes.length}</span>
            </div>
            <div className="stat-details">
              {metadata.classes.length > 0 ? (
                metadata.classes.slice(0, 5).map((cls, idx) => (
                  <div key={idx} className="detail-item">
                    <span className="detail-name">{cls.name}</span>
                    <span className="detail-file">{cls.file}</span>
                  </div>
                ))
              ) : isGitHubMode ? (
                <div className="analysis-note">
                  <p>Class detection requires parsing source files, which is not available for GitHub repositories in this version. This feature works in demo mode where the codebase has been pre-analyzed.</p>
                </div>
              ) : (
                <div className="detail-item">
                  <span className="detail-name no-data">No classes defined</span>
                </div>
              )}
            </div>
          </div>

          <div className="stat-section">
            <div className="stat-header">
              <span className="stat-label">Dependencies</span>
              <span className="stat-count">{metadata.imports.length}</span>
            </div>
            <div className="stat-details">
              {metadata.imports.slice(0, 5).map((imp, idx) => (
                <div key={idx} className="detail-item">
                  <span className="detail-name">{imp.source}</span>
                </div>
              ))}
              {metadata.imports.length > 5 && (
                <div className="detail-item more">
                  <span className="detail-name">+{metadata.imports.length - 5} more dependencies</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
