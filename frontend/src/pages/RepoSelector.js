import React, { useState, useEffect } from 'react';
import { FiGitBranch, FiStar, FiLock, FiGlobe, FiSearch, FiLoader } from 'react-icons/fi';
import { getUserRepos } from '../services/api';
import '../styles/RepoSelector.css';

const RepoSelector = ({ onRepoSelect, githubUser }) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                const response = await getUserRepos();
                setRepos(response.data || []);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch repositories:', err);
                setError('Unable to load your repositories. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const filteredRepos = repos.filter(repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Updated today';
        if (diffDays === 1) return 'Updated yesterday';
        if (diffDays < 7) return `Updated ${diffDays} days ago`;
        if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
        return `Updated ${Math.floor(diffDays / 30)} months ago`;
    };

    if (loading) {
        return (
            <div className="repo-selector-loading">
                <FiLoader className="spinning" />
                <p>Loading your repositories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="repo-selector-error card">
                <h2>Something went wrong</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="btn">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="repo-selector">
            <div className="selector-header">
                <h1>Select a Repository</h1>
                <p>Choose a repository from your GitHub account to analyze</p>
            </div>

            <div className="search-section card">
                <div className="search-input-wrapper">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="search-info">
                    Showing {filteredRepos.length} of {repos.length} repositories
                </div>
            </div>

            <div className="repos-grid">
                {filteredRepos.length > 0 ? (
                    filteredRepos.map((repo) => (
                        <div
                            key={repo.id}
                            className="repo-card card"
                            onClick={() => onRepoSelect(repo)}
                        >
                            <div className="repo-header">
                                <div className="repo-name-row">
                                    {repo.private ? (
                                        <FiLock className="visibility-icon private" />
                                    ) : (
                                        <FiGlobe className="visibility-icon public" />
                                    )}
                                    <h3 className="repo-name">{repo.name}</h3>
                                </div>
                                {repo.stargazers_count > 0 && (
                                    <div className="repo-stars">
                                        <FiStar />
                                        <span>{repo.stargazers_count}</span>
                                    </div>
                                )}
                            </div>

                            <p className="repo-description">
                                {repo.description || 'No description provided'}
                            </p>

                            <div className="repo-meta">
                                {repo.language && (
                                    <span className="repo-language">
                                        <span className="language-dot"></span>
                                        {repo.language}
                                    </span>
                                )}
                                <span className="repo-updated">{formatDate(repo.updated_at)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-repos-found card">
                        <p>No repositories match your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RepoSelector;
