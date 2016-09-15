'use strict';
var router = require('express').Router();

var Cart = require('../../../db').model('cart');
var User = require('../../../db').model('user'); // eslint-disable-line new-cap

module.exports = router;


router.post('/', function (req, res, next) {
  var userLogin = {};
  userLogin.email = req.body.email;
  userLogin.password = req.body.password;
  return User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next);
});

router.get('/:id', function(req, res, next) {
	return User.findById(req.params.id)
	.then(function(user) {
		if (!user) { res.status(404).send(); }
		res.json(user);
	});

});


// ATTEMPT TO LOGIN DIRECTLY AFTER SIGNUP
// return $http.post('/login', credentials)
//                 .then(onSuccessfulLogin)
//                 .catch(function () {
//                     return $q.reject({ message: 'Invalid login credentials.' });
//                 });

