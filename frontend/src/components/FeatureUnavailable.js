import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft, FiCpu } from 'react-icons/fi';
import '../styles/FeatureUnavailable.css';

const FeatureUnavailable = ({
    title = 'Feature Not Available',
    featureName = 'This feature',
    showBackButton = true
}) => {
    return (
        <div className="feature-unavailable">
            <div className="unavailable-card card">
                <div className="unavailable-icon">
                    <FiAlertCircle />
                </div>

                <h2>{title}</h2>

                <div className="unavailable-content">
                    <p className="main-message">
                        {featureName} requires natural language processing capabilities that we haven't integrated yet for custom repositories.
                    </p>

                    <div className="technical-note">
                        <div className="note-header">
                            <FiCpu />
                            <span>Technical Details</span>
                        </div>
                        <p>
                            To provide intelligent code analysis, onboarding tours, and contextual Q&A, the system needs to process and understand your codebase using machine learning models. This involves parsing source files, building semantic representations, and generating human-readable explanations.
                        </p>
                        <p>
                            We're actively working on integrating these capabilities. For now, you can explore how these features work using our demo repository, which has pre-computed analysis data.
                        </p>
                    </div>
                </div>

                <div className="unavailable-actions">
                    {showBackButton && (
                        <Link to="/dashboard" className="btn btn-secondary">
                            <FiArrowLeft />
                            Back to Dashboard
                        </Link>
                    )}
                    <Link to="/" className="btn">
                        Try Demo Repository
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeatureUnavailable;
