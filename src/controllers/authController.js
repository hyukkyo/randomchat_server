const { registerUser, loginUser, accessToken } = require('../services/authService');

async function signup(req, res) {
    const { email, password, name } = req.body;
    try {
        const user = await registerUser(email, password, name);
        res.status(201).json({ 
            message: 'User created successfully',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const tokens = await loginUser(email, password);
        res.status(200).json({ 
            message: 'User logged in successfully',
            tokens
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function access(req, res) {
    const { refreshToken } = req.body;
    try {
        const tokens = await accessToken(refreshToken);
        res.status(200).json({ 
            message: 'Tokens refreshed',
            tokens
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { signup, login, access };