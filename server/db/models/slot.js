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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    endTime: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    dayOfWeek: {
        type: Sequelize.VIRTUAL,
        set: function() {
            var date = this.getDataValue('date');
            var dateObj = new Date(date);
            var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            this.setDataValue('dayOfWeek', daysOfWeek[dateObj.getDay()]);
        }
    }
});
