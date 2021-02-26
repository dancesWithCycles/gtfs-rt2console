const gtfsRt = require('./gtfsRtDecode');
const debug = require('debug')('gtfs');
var request = require('request');

var requestSettings = {
    method: 'GET',
    url:'https://dedriver.org/gtfs-rt/vehiclePostions.pb',
    encoding: null
};

request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        debug('response 200');
	let feed=gtfsRt.decode(body);
    }else{
	debug('error or unsatisfactory status code')
    }
});


