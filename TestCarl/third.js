var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "testcarl"
});

//Creates a table with collumns
var sql = "CREATE TABLE users (email VARCHAR(255) PRIMARY KEY, created_at TIMESTAMP DEFAULT NOW())";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

connection.end();