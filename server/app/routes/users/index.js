'use strict';
var router = require('express').Router();

var Cart = require('../../../db').model('cart');
var User = require('../../../db').model('user'); // eslint-disable-line new-cap
var chalk = require('chalk');
module.exports = router;


router.post('/', function (req, res, next) {
  var userLogin = {};
  userLogin.email = req.body.email;
  userLogin.password = req.body.password;
  return User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next);
});

router.get('/', function(req, res, next) {
  console.log('getting here');
  return User.findAll()
  .then(function(users) {
    res.json(users);
  })
  .catch(next);
});


router.get('/:id', function(req, res, next) {
	return User.findById(req.params.id)
	.then(function(user) {
		if (!user) { res.status(404).send(); }
		res.json(user);
	})
  .catch(next);

})
;


router.put('/:id', function(req, res, next) {
  console.log(chalk.red("INSIDE put rout"), req.body);
  User.findById(req.params.id)
  .then(function (user) {
    return user.update(req.body);
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

