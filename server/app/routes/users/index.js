'use strict';
var router = require('express').Router();
<<<<<<< HEAD
var User = require('../../../db').model('user'); // eslint-disable-line new-cap
module.exports = router;


router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next);
});
=======
var User = require('../../../db').model('user');
module.exports = router;

router.get('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		if (!user) { res.status(404).send(); }
		res.json(user);
	});
}); 
>>>>>>> 053fe9b0ec8da22c3f801bd984b87dedee169d38
