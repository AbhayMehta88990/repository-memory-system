import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCheckCircle, FiMonitor, FiServer, FiSettings, FiCode, FiFileText, FiLayers, FiZap } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import FeatureUnavailable from '../components/FeatureUnavailable';
import { generateTour } from '../services/api';
import '../styles/OnboardingTour.css';

const DEVELOPER_ROLES = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'UI components, React routes, state management, API integration',
    icon: FiMonitor,
    color: '#6366f1'
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'APIs, services, database layer, authentication logic',
    icon: FiServer,
    color: '#8c7851'
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Build scripts, CI/CD pipelines, deployment, infrastructure',
    icon: FiSettings,
    color: '#10b981'
  }
];

const OnboardingTour = ({ analysisData, isGitHubMode = false }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [tour, setTour] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTour = async (role) => {
    try {
      setLoading(true);
      setError(null);
      const response = await generateTour(role);
      setTour(response.data);
    } catch (err) {
      console.error('Failed to generate tour:', err);
      setError('Failed to generate onboarding tour');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setCurrentStep(0);
    fetchTour(roleId);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setTour(null);
    setCurrentStep(0);
  };

  // Show unavailable state for GitHub mode
  if (isGitHubMode) {
    return (
      <FeatureUnavailable
        title="Onboarding Tour"
        featureName="The guided onboarding tour"
      />
    );
  }

  // Role Selection Screen
  if (!selectedRole) {
    return (
      <div className="onboarding-tour">
        <div className="tour-header">
          <h1>Onboarding Tour</h1>
          <p>Choose your role to get a personalized walkthrough of the codebase</p>
        </div>

        <div className="role-selection-container">
          <div className="role-selection-intro card">
            <div className="intro-icon">
              <FiLayers />
            </div>
            <h2>Personalized Learning Path</h2>
            <p>
              Our onboarding system adapts to your role. Select your primary focus area below,
              and we'll guide you through the parts of the codebase most relevant to your work.
            </p>
          </div>

          <div className="role-cards">
            {DEVELOPER_ROLES.map((role) => {
              const IconComponent = role.icon;
              return (
                <button
                  key={role.id}
                  className="role-card"
                  onClick={() => handleRoleSelect(role.id)}
                  style={{ '--role-color': role.color }}
                >
                  <div className="role-icon">
                    <IconComponent />
                  </div>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                  <div className="role-arrow">
                    <FiChevronRight />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="tour-loading">
        <LoadingSpinner />
        <p>Generating your personalized {DEVELOPER_ROLES.find(r => r.id === selectedRole)?.title} tour...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="tour-error card">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => fetchTour(selectedRole)} className="btn">
          Try Again
        </button>
      </div>
    );
  }

  // No Tour Data
  if (!tour || tour.length === 0) {
    return (
      <div className="tour-empty card">
        <h2>No tour available</h2>
        <p>Unable to generate onboarding tour at this time.</p>
        <button onClick={handleBackToRoles} className="btn">
          Choose Different Role
        </button>
      </div>
    );
  }

  const currentStepData = tour[currentStep];
  const progress = ((currentStep + 1) / tour.length) * 100;
  const currentRole = DEVELOPER_ROLES.find(r => r.id === selectedRole);

  const handleNext = () => {
    if (currentStep < tour.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === tour.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="onboarding-tour">
      <div className="tour-header">
        <div className="tour-header-top">
          <button onClick={handleBackToRoles} className="back-to-roles-btn">
            <FiChevronLeft />
            Change Role
          </button>
          <div className="current-role-badge" style={{ '--role-color': currentRole?.color }}>
            {currentRole && <currentRole.icon />}
            <span>{currentRole?.title} Path</span>
          </div>
        </div>
        <h1>Onboarding Tour</h1>
        <p>Follow this guided tour tailored for your role</p>
      </div>

      {/* Progress Section */}
      <div className="progress-section card">
        <div className="progress-info">
          <span>Step {currentStep + 1} of {tour.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%`, backgroundColor: currentRole?.color }}
          ></div>
        </div>
      </div>

      {/* Current Step */}
      <div className="tour-step card">
        <div className="step-header">
          <span className="step-number" style={{ backgroundColor: currentRole?.color }}>
            {currentStepData.step || currentStep + 1}
          </span>
          {currentStepData.highlight && (
            <span className="step-highlight">{currentStepData.highlight}</span>
          )}
          {isLastStep && <FiCheckCircle className="completion-icon" />}
        </div>

        <h2 className="step-title">{currentStepData.title}</h2>
        <p className="step-description">{currentStepData.description}</p>

        {currentStepData.codeSnippet && (
          <div className="step-code">
            <div className="code-header">
              <FiCode />
              <span>Code Example</span>
            </div>
            <pre><code>{currentStepData.codeSnippet}</code></pre>
          </div>
        )}

        {currentStepData.files && currentStepData.files.length > 0 && (
          <div className="step-files">
            <div className="files-header">
              <FiFileText />
              <span>Related Files</span>
            </div>
            <div className="files-list">
              {currentStepData.files.map((file, idx) => (
                <span key={idx} className="file-tag">
                  {typeof file === 'string' ? file : file.path || file.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step Indicators */}
      <div className="step-indicators-container">
        {tour.map((step, idx) => (
          <button
            key={idx}
            className={`step-indicator ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
            onClick={() => setCurrentStep(idx)}
            style={{ '--indicator-color': currentRole?.color }}
          >
            <span className="indicator-number">{idx + 1}</span>
            <span className="indicator-title">{step.title.substring(0, 20)}...</span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="tour-navigation">
        <button
          className="btn btn-outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
        >
          <FiChevronLeft /> Previous
        </button>

        {isLastStep ? (
          <button className="btn btn-success" onClick={handleBackToRoles}>
            <FiCheckCircle /> Complete Tour
          </button>
        ) : (
          <button className="btn" onClick={handleNext}>
            Next <FiChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingTour;
