const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const postgresQuery = (query) => {
  return new Promise(function (resolve, reject) {

    pool.query(query, async (error, results) => {
      if (error) {
        reject(error);
        await pool.end();
      }
      resolve(`A new merchant has been added added: ${results.rows[0]}`);
      await pool.end();
    });
  });
};

module.exports = postgresQuery;