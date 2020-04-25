const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
let tools = require('./ramadan/ramadan');

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
    ]
});

let counter = 0;

app.get('/', function (req, res) {
    mysql().then(function (ans) {
        res.send('Hi,' + ans + ' you are visitore number ' + counter);
    });
    logger.info("{" + counter + "}");
});

app.get('/ramadan', function (req, res) {
    tools.ramadan(function (ans) {
        res.send(  ans );
    });
});

function mysql() {
    return new Promise(function (resolve, reject) {
        let mysql = require('mysql');
        let con = mysql.createConnection({
            host: "us-cdbr-iron-east-05.cleardb.net",
            user: "b18b59a176d884",
            password: "b154c21c",
            database: "heroku_cf1ed04491a650c"
        });

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = "select * from shogan;";
            con.query(sql, function (err, result) {
                // if (err) throw err;
                console.log("Result: " + result[0].name);
                resolve(result[0].name);
            });
            con.end()
        });
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));