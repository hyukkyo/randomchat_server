const jwt = require('jsonwebtoken');

const { SECRET_KEY, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = process.env;

function createAccessToken(userId) {
    const payload = {
        userId: userId,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

function createRefreshToken(userId) {
    const payload = {
        userId: userId,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

function verifyToken(token, callback) {
    return jwt.verify(token, SECRET_KEY, callback);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyToken,
};