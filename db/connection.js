require('dotenv').config();  // Load environment variables from .env file
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,  // Read password from environment variable
  database: 'EmployeeTrackerDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

module.exports = connection;
