const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
let ejs = require('ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('*/css',express.static('FrontEnd/css'));
app.use('*/js',express.static('FrontEnd/js'));
app.use('*/images',express.static('FrontEnd/images'));
app.use('*/Sounds', express.static('FrontEnd/Sounds'));

app.use(express.static(path.join(__dirname, '../FrontEnd/')));

console.log("something")

app.post('/comp4537/MemoryGame/leaderboard.ejs', urlencodedParser, function (req, res) {
  addUser(req.body['userName'], req.body['score'])
  showUsers(res);
});

app.use(express.static('/home/ntbitten/repositories/memory-game/FrontEnd/'));

router.get('/comp4537/MemoryGame/',function(req,res){
  res.sendFile(path.join(__dirname, '../FrontEnd/index.html'));
  
});

router.get('/comp4537/MemoryGame/index.html',function(req,res){
  res.sendFile(path.join(__dirname, '../FrontEnd/index.html'));
  
});

router.get('/comp4537/MemoryGame/summary.html',function(req,res){
  res.sendFile(path.join(__dirname, '../FrontEnd/summary.html'));
});

router.get('/comp4537/MemoryGame/leaderboard.ejs',function(req,res){
  
  showUsers(res);
});

//add the router
app.use('/', router);
app.listen();

function showUsers(res){
    
    const con = mysql.createConnection({
    host: "localhost",
    user: "ntbitten_UserScores_admin",
    password: "h^tO91@$!SJm",
    database: "ntbitten_UserScores"
    });
    
    con.query('SELECT * FROM score', (err, result, fields) => {

        if (err) throw err;
        res.render('../FrontEnd/leaderboard.ejs', { title: 'User List', userData: result});
        console.log(result)
    });
}

function addUser(username, score) {
    
    const con = mysql.createConnection({
    host: "localhost",
    user: "ntbitten_UserScores_admin",
    password: "h^tO91@$!SJm",
    database: "ntbitten_UserScores"
    });
  

  con.connect(err => {

    if (err) throw err;

    const createTableQuery = [
        'CREATE TABLE IF NOT EXISTS score',
        '(id INT AUTO_INCREMENT PRIMARY KEY,',
        'name VARCHAR(255),',
        'score INT)'
    ].join(' ');
    con.query(createTableQuery, (err, result) => {

        if (err) throw err;

        const insertQuery = "INSERT INTO score (name, score) VALUES('"+username+"', '"+score+"')";
        con.query(insertQuery, (err, result) => {
            if (err) throw err;
        });

        con.end(err => {

            if (err) throw err;
            console.log('closed database connection');
            process.exit();
        });
    });
});
}