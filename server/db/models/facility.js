'use strict';
var crypto = require('crypto');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('facility', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
  	type: Sequelize.TEXT
  }
});
