const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'ls-c484105ab66e38df20a16ba0272e6d5272e1794f.c5kccey0830x.us-east-1.rds.amazonaws.com', // Replace with your Lightsail endpoint
  user: 'dbmasteruser', // Replace with your database username
  password: 'vcaL;]#W%^Guw==)~[s^*nX$NC?88+9`', // Replace with your database password
  database: 'Financify', // Replace with your database name
  port: 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
});

// Wrap the connection pool with a promise to easily handle async operations
const promisePool = pool.promise();

// Export the pool to use in other parts of your application
module.exports = pool;
