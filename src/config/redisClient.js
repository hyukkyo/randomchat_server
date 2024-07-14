const redis = require('redis');

const { REDIS_HOST, REDIS_PORT } = process.env;

const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error', err);
});

module.exports = redisClient;
