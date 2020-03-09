var express = require('express');
var mysql = require('mysql');
var app = express();

app.set("view engine", "ejs");

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: 'root',
  database : 'join_us'
});

con.connect(function(err){
    if (err) throw err;
    console.log("connected to the database");
});

app.get("/", function(req, res){
    //res.send("You've reached the home page!");

    //Find all the emails in users and render it on a webpage
    var q = "SELECT email FROM users";
    con.query(q, function(err, results){
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.listen(3030, function(){
    console.log("Online on port 3030");
});

