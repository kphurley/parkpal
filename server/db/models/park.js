'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('park', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
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
