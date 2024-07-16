const redis = require("redis");

const { REDIS_HOST, REDIS_PORT } = process.env;

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  // Redis 4.x 버전에서는 url을 통해 연결
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("ready", () => {
  console.log("Redis client ready");
});

redisClient.on("end", () => {
  console.log("Redis client disconnected");
});

redisClient.on("error", (err) => {
  console.error("Redis error", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
