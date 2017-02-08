/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'User',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    Id: {
      columnName: 'Id',
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
  	Firstname: {
  		columnName: 'Firstname',
  		type: 'string',
  		size: 25
  	},
  	Lastname: {
  		columnName: 'Lastname',
  		type: 'string',
  		size: 25
  	},
  	Email: {
  		columnName: 'Email',
  		type: 'string',
  		size: 40,
  		unique: true
  	},
  	Phone: {
  		columnName: 'Phone',
  		type: 'string',
  		size: 15
  	}
  }
};

