require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL,
  dbName: process.env.DB_NAME,
};

module.exports = { config }
