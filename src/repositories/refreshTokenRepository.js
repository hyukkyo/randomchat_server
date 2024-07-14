const redisClient = require('../util/redisClient');
const jwt = require('jsonwebtoken');
const { jwtRefreshSecret } = require('../config/jwtConfig');

const createRefreshToken = async (userId, token) => {
  const expiryDate = jwt.verify(token, jwtRefreshSecret).exp;
  await redisClient.setex(userId.toString(), expiryDate, token);
};

const findRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    redisClient.get(userId.toString(), (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const deleteRefreshToken = async (userId) => {
  await redisClient.del(userId.toString());
};

module.exports = {
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken
};
