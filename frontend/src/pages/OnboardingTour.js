import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import FeatureUnavailable from '../components/FeatureUnavailable';
import { generateTour } from '../services/api';
import '../styles/OnboardingTour.css';

const OnboardingTour = ({ analysisData, isGitHubMode = false }) => {
  const [tour, setTour] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip fetching if in GitHub mode
    if (isGitHubMode) {
      setLoading(false);
      return;
    }

    const fetchTour = async () => {
      try {
        setLoading(true);
        const response = await generateTour();
        setTour(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to generate tour:', err);
        setError('Failed to generate onboarding tour');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [isGitHubMode]);

  // Show unavailable state for GitHub mode
  if (isGitHubMode) {
    return (
      <FeatureUnavailable
        title="Onboarding Tour"
        featureName="The guided onboarding tour"
      />
    );
  }

  if (loading) {
    return (
      <div className="tour-loading">
        <LoadingSpinner />
        <p>Generating your personalized onboarding tour...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tour-error card">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!tour || tour.length === 0) {
    return (
      <div className="tour-empty card">
        <h2>No tour available</h2>
        <p>Unable to generate onboarding tour at this time.</p>
      </div>
    );
  }

  const currentStepData = tour[currentStep];
  const progress = ((currentStep + 1) / tour.length) * 100;

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
        <h1>Onboarding Tour</h1>
        <p>Follow this guided tour to understand the codebase</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-section card">
        <div className="progress-info">
          <span>Step {currentStep + 1} of {tour.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step */}
      <div className="tour-step card">
        <div className="step-header">
          <span className="step-number">Step {currentStepData.step || currentStep + 1}</span>
          {isLastStep && <FiCheckCircle className="completion-icon" />}
        </div>

        <h2 className="step-title">{currentStepData.title}</h2>
        <p className="step-description">{currentStepData.description}</p>

        {currentStepData.files && currentStepData.files.length > 0 && (
          <div className="step-files">
            <h3>Related Files:</h3>
            <ul className="files-list">
              {currentStepData.files.map((file, idx) => (
                <li key={idx} className="file-item">
                  <code>{typeof file === 'string' ? file : file.path || file.name}</code>
                </li>
              ))}
            </ul>
          </div>
        )}
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

        <div className="step-indicators">
          {tour.map((_, idx) => (
            <div
              key={idx}
              className={`step-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(idx)}
            ></div>
          ))}
        </div>

        {isLastStep ? (
          <button className="btn" onClick={() => setCurrentStep(0)}>
            <FiCheckCircle /> Start Over
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
