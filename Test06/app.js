var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: "root",
  database : 'join_us'
});

app.get("/", function(req, res){
    // Find count of users in DB
    var q = "SELECT * FROM users";
    var arra = [];
    var arrb = [];
    connection.query(q, function(err, results, fields){
        if(err) throw err;
        for (var i = 0; i < results.length; i++) {
            var a = (results[i].email);
            arra.push(a);
            var b = (results[i].created_at);
            arrb.push(b);
        };
        var emailResult = arra;
        var createdResult = arrb;
        res.render("home", {emailResult: emailResult, createdResult:createdResult});
    });
});

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.render("/");
    });
});

app.post("/search", function(req, res){
    var user = "%" + req.body.search + "%";
    let arr = [];
    connection.query('SELECT email FROM users WHERE email like ?', user, function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            var a = (result[i].email);
            arr.push(a);
        }
        var searchResult = arr;
        res.render("found", {searchResult: searchResult});
    });
});

app.post("/replace", function(req, res){
    var replaceFrom = req.body.replaceFrom;
    var replaceTo = req.body.replaceTo;
    let arr = [];
    connection.query('UPDATE users SET email = ? WHERE email = ?', [replaceTo, replaceFrom], function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            var a = (result[i].email);
            arr.push(a);
        }
        res.render("./home");
    });
});

app.post("/delete", function(req, res){
    var toDelete = req.body.delete;
    connection.query('DELETE FROM users WHERE email = ?', toDelete, function(err, result) {
        if (err) throw err;
        res.render("./home");
    });
});

app.listen(8080, function(){
    console.log("Server running on 8080!");
});