const debug = require('debug')('gtfs');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

function decode(buffer){
    console.log('decode');

    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
    if(feed){
	debug('feed: %s',feed)
	let header=feed.header;
	if(header){
	    debug('header: %s',header)
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
		if(vehPos.position){
		    const pos=vehPos.position;
		    debug('position')
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
    return feed;
}
module.exports = {decode}

