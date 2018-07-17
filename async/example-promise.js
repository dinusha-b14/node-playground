// function doWork(data, callback) {
//     callback('done');
// }

// function doWorkPromise(data) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(function() {
//             reject('everything is broken');
//         }, 1000);
        
//         // reject({
//         //     error: 'something bad happened'
//         // });
//     });
// }

// doWorkPromise('some data').then(function(data){
//     console.log(data);
// }, function(error) {
//     console.log(error);
// });
var request = require('request');

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
    //    
}

getWeather('Sydney').then(function(currentWeather) {
    console.log(currentWeather);
}, function(error) {
    console.log(error);
});
