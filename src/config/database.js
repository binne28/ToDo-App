const mysql = require('mysql2/promise');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2805',
    database: 'test12'
})

module.exports = db;