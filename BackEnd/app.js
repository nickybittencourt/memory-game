const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/leaderboard', urlencodedParser, function (req, res) {
    
  console.log(req.body)
  addUser(req.body['userName'], req.body['score'])
  res.sendFile(path.join(__dirname, '../FrontEnd/leaderboard.html'));
});

app.use(express.static(path.join(__dirname, '../FrontEnd/')));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname, '../FrontEnd/index.html'));
  
});

router.get('/summary',function(req,res){
  res.sendFile(path.join(__dirname, '../FrontEnd/summary.html'));
});

router.get('/leaderboard',function(req,res){
  
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

function addUser(username, score) {

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
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

        const insertQuery = "INSERT INTO score (name, score) VALUES('"+username+"', '+score+')";
        con.query(insertQuery, (err, result) => {
            if (err) throw err;
            console.log('1 record inserted');
        });

        con.end(err => {

            if (err) throw err;
            console.log('closed database connection');
            process.exit();
        });
    });
});
}