const express = require('express');
const router = express.Router();
const axios = require('axios');

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

/**
 * @route GET /api/auth/github
 * @desc Redirect to GitHub OAuth authorization page
 */
router.get('/github', (req, res) => {
    const redirectUri = `${BACKEND_URL}/api/auth/github/callback`;
    const scope = 'user:email read:user repo';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    res.redirect(githubAuthUrl);
});

/**
 * @route GET /api/auth/github/callback
 * @desc Handle GitHub OAuth callback
 */
router.get('/github/callback', async (req, res) => {
    const { code, error } = req.query;

    if (error) {
        console.error('GitHub OAuth error:', error);
        return res.redirect(`${FRONTEND_URL}/auth/callback?error=${encodeURIComponent(error)}`);
    }

    if (!code) {
        return res.redirect(`${FRONTEND_URL}/auth/callback?error=no_code`);
    }

    try {
        // Exchange code for access token
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code: code,
            },
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        const { access_token, error: tokenError } = tokenResponse.data;

        if (tokenError || !access_token) {
            console.error('Token exchange error:', tokenError);
            return res.redirect(`${FRONTEND_URL}/auth/callback?error=token_exchange_failed`);
        }

        // Fetch user data from GitHub
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        const userData = userResponse.data;

        // Redirect to frontend with user data and token
        const authData = {
            token: access_token,
            user: {
                id: userData.id,
                login: userData.login,
                name: userData.name || userData.login,
                avatar_url: userData.avatar_url,
                html_url: userData.html_url,
            },
        };

        // Encode auth data as base64 to pass via URL
        const encodedData = Buffer.from(JSON.stringify(authData)).toString('base64');

        res.redirect(`${FRONTEND_URL}/auth/callback?data=${encodedData}`);
    } catch (err) {
        console.error('GitHub OAuth callback error:', err.message);
        res.redirect(`${FRONTEND_URL}/auth/callback?error=server_error`);
    }
});

/**
 * @route GET /api/auth/user/repos
 * @desc Get authenticated user's repositories
 */
router.get('/user/repos', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const reposResponse = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
            params: {
                sort: 'updated',
                per_page: 50,
            },
        });

        res.json({
            success: true,
            data: reposResponse.data.map((repo) => ({
                id: repo.id,
                name: repo.name,
                full_name: repo.full_name,
                description: repo.description,
                html_url: repo.html_url,
                language: repo.language,
                stargazers_count: repo.stargazers_count,
                updated_at: repo.updated_at,
                private: repo.private,
            })),
        });
    } catch (err) {
        console.error('Failed to fetch repos:', err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch repositories' });
    }
});

/**
 * @route GET /api/auth/verify
 * @desc Verify if the token is still valid
 */
router.get('/verify', async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        res.json({
            success: true,
            user: {
                id: userResponse.data.id,
                login: userResponse.data.login,
                name: userResponse.data.name || userResponse.data.login,
                avatar_url: userResponse.data.avatar_url,
            },
        });
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
});

/**
 * @route GET /api/auth/repo/:repoFullName/stats
 * @desc Get repository statistics from GitHub
 */
router.get('/repo/:repoFullName/stats', async (req, res) => {
    const authHeader = req.headers.authorization;
    const { repoFullName } = req.params;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const [owner, repo] = decodeURIComponent(repoFullName).split('/');

    try {
        // Fetch repository info
        const repoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        // Fetch languages
        const languagesResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        // Fetch repo contents (root level)
        const contentsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        const repoData = repoResponse.data;
        const languages = languagesResponse.data;
        const contents = contentsResponse.data;

        // Count files and build language stats
        const languageStats = {};
        let totalBytes = 0;
        Object.entries(languages).forEach(([lang, bytes]) => {
            languageStats[lang] = Math.round(bytes / 1000); // Convert to KB
            totalBytes += bytes;
        });

        // Find entry points
        const entryPointNames = ['index.js', 'main.js', 'app.js', 'server.js', 'index.ts', 'main.ts', 'app.ts'];
        const entryPoints = contents
            .filter(item => item.type === 'file' && entryPointNames.includes(item.name.toLowerCase()))
            .map(item => ({ name: item.name, path: item.path }));

        // Build response matching demo data structure
        const analysisData = {
            summary: {
                projectName: repoData.name,
                totalFiles: contents.filter(item => item.type === 'file').length,
                totalLines: Math.round(totalBytes / 50), // Rough estimate: 50 bytes per line
                languages: languageStats,
            },
            metadata: {
                functions: [],
                classes: [],
                imports: Object.keys(languages).map(lang => ({ source: lang })),
            },
            keyFiles: {
                entryPoints: entryPoints.length > 0 ? entryPoints : [{ name: 'Repository root', path: '/' }],
            },
        };

        res.json({
            success: true,
            data: analysisData,
        });
    } catch (err) {
        console.error('Failed to fetch repo stats:', err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch repository statistics' });
    }
});

module.exports = router;
