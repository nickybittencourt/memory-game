const mysql = require('mysql');
const express = require('express');
const app = express()
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/leaderboard', urlencodedParser, function (req, res) {
    
    console.log(req.body)
});

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
        console.log('Table created');

        const insertQuery = "INSERT INTO score (name, score) VALUES('Peter, 15)";
        con.query(insertQuery, (err, result) => {
            if (err) throw err;
            console.log('1 record inserted');
        });

        con.query('SELECT * FROM score limit 1', (err, result, fields) => {

            if (err) throw err;
            console.log(result[0]['name']);
            console.log(result[0]['score']);
        });

        con.end(err => {

            if (err) throw err;
            console.log('closed database connection');
            process.exit();
        });
    });
});