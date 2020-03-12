var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: "root",
  database : 'join_us'
});

app.get("/", function(req, res){
    // Find count of users in DB
    var q = "SELECT * FROM users";
    var arr = [];
    connection.query(q, function(err, results, fields){
        if(err) throw err;
        for (var i = 0; i < results.length; i++) {
            var a = (results[i].email);
            arr.push(a);
        }
        var testResult = arr;
        res.render("home", {testResult: testResult});
    });
});

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.post("/search", function(req, res){
    var user = "%" + req.body.search + "%";
    let arr = [];
    connection.query('SELECT email FROM users WHERE email =  ?', user, function(err, result) {
        console.log("SELECT email FROM users WHERE email = " + user);
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            var a = (result[i]);
            arr.push(a);
        }
        console.log("x: " + arr[0]);
        res.render("found");
    });
});

app.listen(8080, function(){
    console.log("Server running on 8080!");
});