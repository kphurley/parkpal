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
var Review = require('./models/review');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
Park.hasMany(Facility);
Facility.belongsTo(Park);

Facility.hasMany(Slot);
Slot.belongsTo(Facility);

User.hasMany(Transaction);
Transaction.belongsTo(User);

Transaction.hasMany(Slot);
Slot.belongsTo(Transaction);

Transaction.belongsToMany(Facility, {through: Slot});
Facility.belongsToMany(Transaction, {through: Slot});

Cart.hasMany(Slot);
Slot.belongsTo(Cart);

User.belongsToMany(Park, {through: ParkAccess});
Park.belongsToMany(User, {through: ParkAccess});

Facility.belongsToMany(Type, {through: 'facility_type'});
Type.belongsToMany(Facility, {through: 'facility_type'});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Facility.hasMany(Review);
Review.belongsTo(Facility);


