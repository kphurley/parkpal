'use strict';
var router = require('express').Router();

var Cart = require('../../../db').model('cart');
var User = require('../../../db').model('user'); // eslint-disable-line new-cap
var chalk = require('chalk');
var userTransactionsRouter = require('./transactions');
var authAPI = require('../authAPI');
var Promise = require('bluebird');

module.exports = router;

router.use('/:id', function(req, res, next) {
  return User.findById(req.params.id)
  .then(function(user) {
    if (!user) { res.status(404).send(); }
    req.reqUser = user;
    next();
  })
  .catch(next);
});

router.use('/:id/transactions', authAPI.isMe, userTransactionsRouter);

router.post('/', function (req, res, next) {
  var user = {};
  user.email = req.body.email;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.phone = req.body.phone;
  return Promise.all([User.create(user), Cart.create()])
  .spread((user, cart) => user.setCart(cart))
  .then((cart) => cart.getUser())
  .then((user) => res.status(201).json(user))
  .catch(next);
});

router.get('/', function(req, res, next) {
  return User.findAll()
  .then(function(users) {
    res.json(users);
  })
  .catch(next);
});

router.get('/:id', authAPI.isMe, function(req, res, next) {
	return User.findById(req.params.id)
	.then(function(user) {
		if (!user) { res.status(404).send(); }
		res.json(user);
	})
  .catch(next);

});


router.put('/:id', authAPI.isMe, function(req, res, next) {
  User.findById(req.params.id)
  .then(function (user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phone = req.body.phone;
    console.log("*******************************", req.body)
    return user.update(user);
  })
  .then(function(user) {
    if (!user) { throw new Error("I don't know what to do") }
    res.json(user);
  })
  .catch(next);

});


// ATTEMPT TO LOGIN DIRECTLY AFTER SIGNUP
// return $http.post('/login', credentials)
//                 .then(onSuccessfulLogin)
//                 .catch(function () {
//                     return $q.reject({ message: 'Invalid login credentials.' });
//                 });

