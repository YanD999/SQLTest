let express = require('express');
let mysql = require('mysql');
let bodyParser  = require("body-parser");
let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));

//connects to the database
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: "root",
  database : 'join_us'
});


let i = 0;
//renders the database (landing page)
app.get("/", function(req, res){
    // Find count of users in DB
    let q = "SELECT * FROM users LIMIT ?, 15";
    let arra = [];
    let arrb = [];

    let offset = i;
    console.log(req.query.page);
    connection.query(q, [offset],function(err, results, fields){
        if(err) throw err;
        for (let i = 0; i < results.length; i++) {
            let a = (results[i].email);
            arra.push(a);
            let b = (results[i].created_at);
            arrb.push(b);
        };
        let emailResult = arra;
        let createdResult = arrb;
        res.render("home", {emailResult: emailResult, createdResult:createdResult, i});
    });
});

//adds a value to the database
app.post("/register", function(req, res){
    let person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

//loops trough the whole array and renders the fields with corresponding value's
app.post("/search", function(req, res){
    let user = "%" + req.body.search + "%";
    let arr = [];
    connection.query('SELECT email FROM users WHERE email like ?', user, function(err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            let a = (result[i].email);
            arr.push(a);
        }
        let searchResult = arr;
        res.render("found", {searchResult: searchResult});
    });
});

//replaces the value of a specific field.
app.post("/replace", function(req, res){
    let replaceFrom = req.body.replaceFrom;
    let replaceTo = req.body.replaceTo;
    let arr = [];
    connection.query('UPDATE users SET email = ? WHERE email = ?', [replaceTo, replaceFrom], function(err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            let a = (result[i].email);
            arr.push(a);
        }
        res.redirect("/");
    });
});


//replaces the values of a field and renders the same page with the updated value's
app.post("/replaceShow", function(req, res){
    let replaceFrom = req.body.replaceFrom;
    let replaceTo = req.body.replaceTo;
    let arr = [];
    let arrc = [];
    let arrd = [];
    connection.query('UPDATE users SET email = ? WHERE email = ?', [replaceTo, replaceFrom], function(err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            let a = (result[i].email);
            arr.push(a);
        }
    });
    connection.query('SELECT * FROM users WHERE email like ?', replaceTo, function(err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            let a = (result[i].email);
            arrc.push(a);
            let b = (result[i].created_at);
            arrd.push(b);
        }
        let infoResult = arrc;
        let moreCreated = arrd;
        res.render("show", {infoResult:infoResult, moreCreated:moreCreated});
    });
});


//delete's the inserted value
app.post("/delete", function(req, res){
    let toDelete = req.body.delete;
    connection.query('DELETE FROM users WHERE email = ?', toDelete, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

//renders a page with more information about a field
app.post("/moreInfo", function(req, res){
    let more = req.body.more;
    let arrc = [];
    let arrd = [];
    connection.query('SELECT * FROM users WHERE email like ?', more, function(err, result) {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            let a = (result[i].email);
            arrc.push(a);
            let b = (result[i].created_at);
            arrd.push(b);
        }
        let infoResult = arrc;
        let moreCreated = arrd;
        res.render("show", {infoResult:infoResult, moreCreated:moreCreated});
    });
});

app.listen(8080, function(){
    console.log("Server running on 8080!");
});