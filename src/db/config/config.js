module.exports = {
  host: process.env.DB_HOST || "vetpass-staging",
  database: process.env.DB_NAME || "vetpass-staging.cqemspcq0wzh.eu-west-2.rds.amazonaws.com",
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "miMJacSrxgoZT8UxmHQL",
  dialect: "mysql"
};