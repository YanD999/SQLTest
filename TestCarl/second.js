var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //Creates a database
    con.query("CREATE DATABASE testcarl", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

connection.end();