const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const postgresQuery = (query: any) => {
  return new Promise((resolve, reject) => {
    pool.query(query, async (error: {}, results: {}) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = postgresQuery;