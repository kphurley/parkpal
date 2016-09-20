'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('park', {
	id:{
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	address: {
		type: Sequelize.STRING,
	},
	city: {
		type: Sequelize.STRING,
	},
	state: {
		type: Sequelize.STRING,
	},
	zip: {
		type: Sequelize.INTEGER,
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	phone: {
		type: Sequelize.STRING,
		allowNull: false
	}
});
