/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// Cloud Function that runs on user deletion in Firebase Authentication
// exports.deleteUserData = functions.auth.user().onDelete(async (user) => {
//   const userEmail = user.email;

//   try {
//     // Delete user data from MySQL
//     const connection = await pool.getConnection();
//     const query = "DELETE FROM users WHERE email = ?";
//     await connection.query(query, [userEmail]);
//     connection.release();

//     console.log(`Successfully deleted data for user: ${userEmail}`);
//   } catch (error) {
//     console.error("Error deleting user data:", error);
//   }
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mysql = require("mysql2");
admin.initializeApp();

// Set up MySQL connection
const db = mysql.createPool({
  host: "ls-c484105ab66e38df20a16ba0272e6d5272e1794f.c5kccey0830x.us-east-1.rds.amazonaws.com", // Your Lightsail MySQL endpoint
  user: "dbmasteruser", // Replace with your MySQL username
  password: "vcaL;]#W%^Guw==)~[s^*nX$NC?88+9`", // Replace with your MySQL password
  database: "Financify", // Your database name
});

// Trigger on user deletion
exports.deleteUserFromDatabase = functions.auth.user().onDelete(async (user) => {
  const email = user.email;

  try {
    // Delete user from the MySQL database
    const query = "DELETE FROM users WHERE email = ?";
    await db.promise().query(query, [email]);

    console.log(`User with email ${email} deleted from database`);
  } catch (error) {
    console.error(`Error deleting user from database: ${error.message}`);
  }
});
