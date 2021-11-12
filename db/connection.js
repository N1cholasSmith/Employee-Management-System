
const mysql = require('mysql2');

// Connect to database 
const db = mysql.createConnection(
    {
        // MySQL username,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
);

db.connect(err => {
    if (err) throw err;
});

module.exports = db; 