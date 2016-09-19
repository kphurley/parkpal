'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('slot', {
    booked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    startTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});
