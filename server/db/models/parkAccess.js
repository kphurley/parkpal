//parkAccess.js
'use strict';

var db = require('../_db');
var Sequelize = require('sequelize');

module.exports = db.define('parkAccess', {
  accessLevel: {
    type: Sequelize.STRING,
    defaultValue: null
  }
});
