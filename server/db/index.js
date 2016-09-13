'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Park = require('./models/park');
var Facility = require('./models/facility');
var Slot = require('./models/slot');
var ParkAccess = require('./models/parkAccess');
var Type = require('./models/type');
var Transaction = require('./models/transaction');
var Cart = require('./models/cart');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
Park.hasMany(Facility);

Facility.hasMany(Slot);

User.hasMany(Transaction);

Transaction.hasMany(Slot);

Cart.hasMany(Slot);

User.belongsToMany(Park, {through: ParkAccess});
Park.belongsToMany(User, {through: ParkAccess});

Facility.belongsToMany(Type, {through: 'facility_type'});
Type.belongsToMany(Facility, {through: 'facility_type'});


Cart.belongsTo(User, {as: 'userId'});


