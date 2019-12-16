const mysql_2 = require('mysql2');
const { DB_PORT, HOST, USER, PASSWORD, DATABASE } = process.env;

const db = mysql_2.createConnection({
    host: HOST,
    port: DB_PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})

module.exports = db;