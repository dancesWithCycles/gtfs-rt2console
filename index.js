const gtfsRt = require('./gtfsRtDecode');
const debug = require('debug')('gtfs');
var request = require('request');
require('dotenv').config();

const URL=process.env.URL||'https://dedriver.org/gtfs-rt/vehiclePositions.pb';
debug('URL: '+URL)

var requestSettings = {
    method: 'GET',
    url:URL,
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


