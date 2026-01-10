import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiLoader, FiCheckCircle, FiXCircle, FiArrowLeft } from 'react-icons/fi';
import '../styles/AuthCallback.css';

const AuthCallback = ({ onAuthSuccess }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing');
    const [error, setError] = useState(null);

    useEffect(() => {
        const processAuth = () => {
            const data = searchParams.get('data');
            const errorParam = searchParams.get('error');

            if (errorParam) {
                setStatus('error');
                setError(getErrorMessage(errorParam));
                return;
            }

            if (data) {
                try {
                    // Decode base64 auth data
                    const decodedData = JSON.parse(atob(data));

                    // Store auth data in localStorage
                    localStorage.setItem('github_token', decodedData.token);
                    localStorage.setItem('github_user', JSON.stringify(decodedData.user));

                    setStatus('success');

                    // Notify parent component
                    if (onAuthSuccess) {
                        onAuthSuccess(decodedData);
                    }

                    // Redirect to dashboard after short delay
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1500);
                } catch (err) {
                    console.error('Failed to parse auth data:', err);
                    setStatus('error');
                    setError('Failed to process authentication data');
                }
            } else {
                setStatus('error');
                setError('No authentication data received');
            }
        };

        processAuth();
    }, [searchParams, navigate, onAuthSuccess]);

    const getErrorMessage = (errorCode) => {
        const errorMessages = {
            'access_denied': 'You denied access to your GitHub account',
            'no_code': 'No authorization code received from GitHub',
            'token_exchange_failed': 'Failed to exchange code for access token',
            'server_error': 'An error occurred on the server',
        };
        return errorMessages[errorCode] || `Authentication failed: ${errorCode}`;
    };

    const handleRetry = () => {
        navigate('/');
    };

    return (
        <div className="auth-callback-page">
            <div className="auth-callback-container">
                <div className="auth-callback-card">
                    {status === 'processing' && (
                        <div className="auth-status">
                            <div className="status-icon processing">
                                <FiLoader className="spinning" />
                            </div>
                            <h2>Authenticating with GitHub</h2>
                            <p>Please wait while we complete the authentication process.</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="auth-status">
                            <div className="status-icon success">
                                <FiCheckCircle />
                            </div>
                            <h2>Authentication Successful</h2>
                            <p>Redirecting to dashboard...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="auth-status">
                            <div className="status-icon error">
                                <FiXCircle />
                            </div>
                            <h2>Authentication Failed</h2>
                            <p>{error}</p>
                            <button onClick={handleRetry} className="retry-button">
                                <FiArrowLeft />
                                Back to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthCallback;
