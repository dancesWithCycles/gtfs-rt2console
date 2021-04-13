const debug = require('debug')('gtfs');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

function decode(buffer){
    debug('decode...');

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
	    if (entity.tripUpdate) {
		debug('tripUpdate')
		const tripUpdate=entity.tripUpdate;
		if(tripUpdate.trip){
		    debug('TripDescriptor')
		    const trip=tripUpdate.trip
		    if(trip.tripId){
			debug('trip_id: %s',trip.tripId)
		    }
		    if(trip.routeId){
			debug('route_id: %s',trip.routeId)
		    }
		    if(trip.directionId){
			debug('direction_id: %s',trip.directionId)
		    }
		    if(trip.startTime){
			debug('start_time: %s',trip.startTime)
		    }
		    if(trip.startDate){
			debug('start_date: %s',trip.startDate)
		    }
		    if(trip.scheduleRelationship){
			debug('schedule_relationship: %s',trip.scheduleRelationship)
		    }
		}
		if(tripUpdate.vehicle){
		    debug('VehicleDescriptor')
		}
		if(tripUpdate.timestamp){
		    debug('timestamp: %s',tripUpdate.timestamp)
		}
	    }else if(entity.vehicle){
		const vehPos=entity.vehicle;
		debug('vehiclePosition')
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
    debug('...done.')
    return feed;
}
module.exports = {decode}

