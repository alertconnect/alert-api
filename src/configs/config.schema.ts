export default () => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  database: process.env.DATABASE_URL,
  auth: {
    key: process.env.API_KEY,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT) || 6379,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
});
