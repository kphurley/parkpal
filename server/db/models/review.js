var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }

  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
