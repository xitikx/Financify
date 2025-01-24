const pool = require('./db');

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
    connection.release(); // Release the connection back to the pool
  }
});
