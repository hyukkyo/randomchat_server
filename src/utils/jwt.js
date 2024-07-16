const jwt = require("jsonwebtoken");

const { SECRET_KEY, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = process.env;

function createAccessToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

function createRefreshToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

function verifyAccessToken(token, callback) {
  jwt.verify(token, SECRET_KEY, callback);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
