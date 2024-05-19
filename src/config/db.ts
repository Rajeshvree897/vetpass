require('dotenv').config();

module.exports = {
  development: {
    // host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 1000000,
      idle: 10000
    },
    replication: {
      read: { host: process.env.DB_READ_REPLICA_HOST, username: process.env.DB_USER, password: process.env.DB_PASSWORD },
      write: { host: process.env.DB_HOST, username: process.env.DB_USER, password: process.env.DB_PASSWORD }
    },
  },
  production: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    logging: process.env.NODE_ENV !== 'production',
    pool: {
      max: 5,
      min: 0,
      acquire: 1000000,
      idle: 10000
    }
  }
};
