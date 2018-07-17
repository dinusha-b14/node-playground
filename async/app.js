var argv = require('yargs')
    .option('location', {
        alias: 'l',
        demand: false,
        description: 'Name of the city for which you wish to retrieve the weather',
        type: 'string'
    })
    .help('help')
    .argv

var weather = require('./weather.js');
var location = require('./location.js');

if (typeof argv.location === 'string' && argv.location.length > 0) {
    getWeather(argv.location);
} else {
    location().then(function(currentLocation) {
        getWeather(currentLocation.city);
    }, function(error) {
        console.log(error);
    });
}

function getWeather(location) {
    weather(location).then(function(currentWeather) {
        console.log(currentWeather);
    }, function(error) {
        console.log(error);
    });
}
