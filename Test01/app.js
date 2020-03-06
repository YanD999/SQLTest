var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //Creates a database
    /*con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });*/
    
    //Creates a table with collumns
    /*var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        });*/
    
    //Alters a table
    /*var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table altered");
    });*/
    
    //Inserts 1 row of data into a table
    /*var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });*/

    //Inserts multiple rows of data into a table
    /*var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
      ['John', 'Highway 71'],
      ['Peter', 'Lowstreet 4'],
      ['Amy', 'Apple st 652'],
      ['Hannah', 'Mountain 21'],
      ['Michael', 'Valley 345'],
      ['Sandy', 'Ocean blvd 2'],
      ['Betty', 'Green Grass 1'],
      ['Richard', 'Sky st 331'],
      ['Susan', 'One way 98'],
      ['Vicky', 'Yellow Garden 2'],
      ['Ben', 'Park Lane 38'],
      ['William', 'Central st 954'],
      ['Chuck', 'Main Road 989'],
      ['Viola', 'Sideway 1633']
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });*/
       
    //Inserts one value and returns it's ID (Only works with auto-incremental ID's)
    /*var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
    });*/

    //SELECT * FROM table query
    /*con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });*/

    //SELECT columns FROM table query
    con.query("SELECT name, address FROM customers", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        console.log(result[2].address);
    });
});