const express = require('express');
const url = require('url') ;
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
        res.send('Hi, there! you are visitor number:' + counter +'<br/> Please proccede to ' + req.protocol+'://'+req.headers.host+'/ramadan' );
    });
    // logger.info("{" + counter + "}");
});

app.get('/ramadan', function (req, res) {
    typeof tools.ramadan2.then(value => {
        let body = JSON.parse(value).data.timings.Maghrib;
        let formatDate1 = formatDate(body);
        return res.send('<h1 style=font-size:100px>'+formatDate1+'</h1>');
        }
    );
    // tools.ramadan(function (ans) {
    //     res.send(  ans );
    // });
});

function formatDate(date) {
    let hours = date.split(":")[0];
    let minutes = parseInt(date.split(":")[1])+6;
    return hours + ':' + minutes;
}

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