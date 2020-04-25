let request = require("request");

let options = {
    method: 'GET',
    url: 'https://aladhan.p.rapidapi.com/timingsByCity',
    qs: {city: 'afula', country: 'IL'},
    headers: {
        'x-rapidapi-host': 'aladhan.p.rapidapi.com',
        'x-rapidapi-key': '4c4b336767mshc58dbf70856539fp1f0eb7jsn001775516033'
    }
};



module.exports = {
    ramadan: function () {
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            return body
        })
    }
};