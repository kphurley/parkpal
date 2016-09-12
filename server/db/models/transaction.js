'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('transaction', {
    totalAmountPaid: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});
