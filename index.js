const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const debug = require('debug')('gtfs');
const fs = require("fs");
var request = require('request');

var requestSettings = {
    method: 'GET',
    url:'https://dedriver.org/gtfs-rt/vehiclePostions.pb',
    encoding: null
};

request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        debug('response 200');
	// decode
        var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
body);

	if(feed){
	    debug('feed: %s',feed)
	    //debug('feed.toString(): %s',feed.toString())
	    let header=feed.header;
	    if(header){
		debug('header: %s',header)
		//debug('header.toString(): %s',header.toString())
		let gtfsRealtimeVersion=header.gtfsRealtimeVersion;
		if(gtfsRealtimeVersion){
		    debug('gtfsRealtimeVersion: %s',gtfsRealtimeVersion)
		}
	    }

	    feed.entity.forEach(function(entity) {
		if (entity.trip_update) {
		    debug('trip update')
		}else if(entity.vehicle){
		    const vehPos=entity.vehicle;
		    debug('vehicle position')
		    //debug('vehicle toString: %s',vehPos.toString())
		    if(vehPos.position){
			const pos=vehPos.position;
			debug('position')
			//debug('position toString: %s',pos.toString())
			if(pos.latitude){
			    const lat=pos.latitude;
			    debug('lat: %s',lat)
			}
			if(pos.longitude){
			    const lon=pos.longitude;
			    debug('lon: %s',lon)
			}
		    }
		}else if(entity.alert){
		    debug('alert')
		}else{
		    debug('entity unknown')
		}
	    });

	    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
	    let errMsg = GtfsRealtimeBindings.transit_realtime.FeedMessage.verify(feed);
	    if (errMsg){
		debug('msg invalid')
		throw Error(errMsg);
	    }else{
		debug('msg valid')
	    }
	    
	}else{
	debug('feed unavailable')
	}
    }else{
	debug('error or unsatisfactory status code')
    }
});


