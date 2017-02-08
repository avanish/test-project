/**
 * StationController
 *
 * @description :: Server-side logic for managing Stations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res, next) {
        Station.find().exec(function foundStations(err, stations) {
            if (err) next(err);
            return res.json(stations);
        });
    },

    populateFromTxt: function (req, res, next) {
    	var fs = require('fs')
		  , filename = 'assets/stations.txt';
		fs.readFile(filename, 'utf8', function(err, data) {
		  if (err) throw err;
		  var parsed = JSON.parse(data);
		  for (var i = 0; i < parsed.length; i++) {
		  	//console.log(parsed[i].station_name);
		  	var obj = {
		  		StationName: parsed[i].station_name,
		  		TrainName: parsed[i].train_name,
		  		Latitude: parsed[i].latitude,
		  		Longitude: parsed[i].longitude
		  	};
		  	Station.create(obj).exec(function createUser(err, station) {
                if (err) next(err);
                //console.log(station);
                //res.json(station);
            })
		  }
		  res.json(parsed);
		});
    	//var obj; // from .txt file
    }
};

