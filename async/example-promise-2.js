// function doWork(shouldFail) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function(){
//             if (typeof shouldFail === 'boolean' && shouldFail === true) {
//                 reject('error message');
//             } else {
//                 resolve('success');
//             }
//         }, 1000);
//     });
// }

// doWork().then(function(message) {
//     console.log(message);
//     return doWork(true);
// }).then(function(message) {
//     console.log(message);
// }).catch(function(error) {
//     console.log(error);
// });

var request = require('request');

function getLocation() {
    return new Promise(function(resolve, reject) {
        var url = 'http://ipinfo.io'

        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (error) {
                reject('Could not determine your location.');
            } else {
                resolve(body.city);
            }
        });
    });
}

function getWeather(location) {
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
                //console.log(JSON.stringify(body, null, 4));
                resolve('It\'s ' + body.main.temp + '\u00B0C in ' + body.name + '!');
            }
        });
    });
    // return promise
    // resolve("It's temp in whereever")
}

getLocation().then(function(location) {
    return getWeather(location);  
}).then(function(currentWeather) {
    console.log(currentWeather);
}).catch(function(error){
    console.log(error);
});
