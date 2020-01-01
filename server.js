const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

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
app.get('/', function(req, res){
    res.send('Hi, you are visitore number ' + ++counter);
    logger.info("{" + counter + "}");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));