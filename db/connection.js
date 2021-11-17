const mysql = require('mysql2');

require('dotenv').config();

// Connect to database 
const connection = mysql.createConnection(
    {
        // MySQL access
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
);

// If connection to db fails, it will throw an error
connection.connect(err => {
    if (err) {
        console.log(err)
        throw err;
    }
});

module.exports = connection;