const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();

// Middleware Setup
app.use(cors({ origin: 'http://localhost:3000' })); // Update origin if necessary
app.use(bodyParser.json());

// MySQL Database Connection Pool
const db = mysql.createPool({
  host: 'ls-c484105ab66e38df20a16ba0272e6d5272e1794f.c5kccey0830x.us-east-1.rds.amazonaws.com',
  user: 'dbmasteruser',
  password: 'vcaL;]#W%^Guw==)~[s^*nX$NC?88+9`',
  database: 'Financify',
});

// Test Database Connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL database successfully');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if database connection fails
  }
})();

// Fetch User Data by Email
app.get('/api/user/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email);
  console.log('Fetching user data for email:', email);
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]); // User data found
    } else {
      res.status(404).json({ message: 'User not found' }); // No user data
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});



app.put('/api/user/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email); // Corrected
  const { income, expenses, savings, investments } = req.body;

  console.log('Received data for update:', req.body);

  const updateQuery = `
    UPDATE users
    SET income = ?, expenses = ?, savings = ?, investments = ?
    WHERE email = ?;
  `;

  try {
    const [rows] = await db.query(updateQuery, [income, expenses, savings, investments, email]);

    if (rows.affectedRows === 0) {
      console.log('No changes were made');
      return res.status(404).json({ message: 'User not found or no changes made' });
    }

    console.log('User data updated successfully');
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Error updating data' });
  }
});


// User Signup Endpoint
app.post('/signup', async (req, res) => {
  const { email, name } = req.body;
  console.log('Sign up request received for:', email);
  try {
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Insert new user into the database
    await db.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name]);
    res.status(201).json({ message: 'User successfully signed up' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
});

// Server Startup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


