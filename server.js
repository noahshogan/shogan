const express = require('express');
const url = require('url');
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
    res.send('Hi, there! you are visitor number:' + counter + '<br/> Please proceed to <a href="' + req.protocol + '://' + req.headers.host + '/ramadan' + '" >here</a>');
});

app.get('/ramadan', function (req, res) {
    typeof tools.ramadan.then(value => {
            let body = JSON.parse(value).data.timings.Maghrib;
            let formatDate1 = formatDate(body);
            return res.send(
                '<head>\n' +
                '    <title>I Want To Eat!</title>\n' +
                '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n' +
                '    <style type="text/css">\n' +
                '        html, body {\n' +
                '            height: 100%;\n' +
                '            margin: 0;\n' +
                '        }\n' +
                '\n' +
                '        #wrapper {\n' +
                '            min-height: 100%; \n' +
                '        }\n' +
                '    </style>\n' +
                '</head>\n' +
                '\n' +
                '<body>\n' +
                '    <div style="text-align: center;height: 100%;width: 100%;"><h1 style="height: 100%;width: 100%;text-align:center;font-size: 300px">' + formatDate1 + '</h1></div>\n' +
                '</body>'
            );
        }
    );
});

function formatDate(date) {
    let hours = date.split(":")[0];
    let minutes = parseInt(date.split(":")[1]) + 5;
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
                console.log("Result: " + result[0].name);
                resolve(result[0].name);
            });
            con.end()
        });
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
