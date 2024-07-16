const redisClient = require("../config/redisClient");
// const { REFRESH_TOKEN_EXPIRY } = process.env;

const saveRefreshToken = async (userId, refreshToken) => {
  // const expiryDate = REFRESH_TOKEN_EXPIRY / 1000;
  // console.log(expiryDate);
  // const expiryDate = jwt.verify(token, jwtRefreshSecret).exp;
  // await redisClient.set(userId.toString(), expiryDate, token);
  await redisClient.set(userId.toString(), refreshToken);
};

// Redis 4.x 이상에서는 콜백 대신 프로미스 기반 API를 사용하므로 모든 명령을 await 비동기로 처리해야함.
const findRefreshToken = async (userId) => {
  // return new Promise((resolve, reject) => {
  //   redisClient.get(userId.toString(), (err, token) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(token);
  //     }
  //   });
  // });
  return await redisClient.get(userId.toString());
};

const deleteRefreshToken = async (userId) => {
  await redisClient.del(userId.toString());
};

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};
