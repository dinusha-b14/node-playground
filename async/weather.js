var request = require('request');


module.exports = function(location) {
    return new Promise(function(resolve, reject) {
        if (!location) {
            return reject('No location provided!');
        }
    
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(location) + "&units=metric&appid=cad109c8a5a653d6df7965af90ad7b6c";
    
        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (error) {
                reject("Unable to fetch weather.");
            } else {
                resolve('It\'s ' + body.main.temp + '\u00B0C in ' + body.name + '!');
            }
        });
    });
}
