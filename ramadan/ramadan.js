// let request = require("request");

let https = require("https")

let options = {
    url: 'https://aladhan.p.rapidapi.com/timingsByCity',
    method: 'GET',
    qs: {city: 'afula', country: 'IL'},
    headers: {
        'x-rapidapi-host': 'aladhan.p.rapidapi.com',
        'x-rapidapi-key': '4c4b336767mshc58dbf70856539fp1f0eb7jsn001775516033'
    }
};

let options2 = {
    host: 'aladhan.p.rapidapi.com',
    port: 443,
    path: '/timingsByCity?city=afula&country=IL',
    method: 'GET',
    // qs: {city: 'afula', country: 'IL'},
    headers: {
        'x-rapidapi-host': 'aladhan.p.rapidapi.com',
        'x-rapidapi-key': '4c4b336767mshc58dbf70856539fp1f0eb7jsn001775516033'
    }
};

module.exports = {
    // ramadan: new Promise(function (resolve, reject) {
    //     request(options, function (error, response, body) {
    //         if (error) throw new Error(error);
    //         resolve(body)
    //     })
    // }),
    ramadan2: new Promise(function (resolve, reject) {
        https.get(options2, function (body) {
            body.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                resolve(chunk)
            });


        })
    })
};