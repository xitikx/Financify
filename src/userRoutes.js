const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the database connection

// Insert user into MySQL after Firebase sign-up
router.post('/signup', async (req, res) => {
  const { email, name } = req.body; // Get user data from request body

  try {
    // Insert the user into the database
    const [result] = await db.execute(
      `INSERT INTO users (email, name) VALUES (?, ?)`,
      [email, name]
    );

    // Send success response
    res.status(201).json({ message: 'User successfully signed up and added to the database!' });
  } catch (error) {
    console.error('Error inserting user into database:', error);
    res.status(500).json({ message: 'Error inserting user into database.' });
  }
});

module.exports = router;
