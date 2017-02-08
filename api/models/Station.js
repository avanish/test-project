/**
 * Station.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Station',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
  	StationId: {
  		columnName: 'StationId',
  		type: 'integer',
  		autoIncrement: true,
  		primaryKey: true
  	},

  	StationName: {
  		columnName: 'StationName',
  		type: 'string',
  		size: 40
  	},

  	TrainName: {
  		columnName: 'TrainName',
  		type: 'string',
  		size: 15
  	},

  	Latitude: {
  		columnName: 'Latitude',
  		type: 'string',
  		size: 15
  	},

  	Longitude: {
  		columnName: 'Longitude',
  		type: 'string',
  		size: 15
  	}
  }
};

