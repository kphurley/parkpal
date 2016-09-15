'use strict';
var router = require('express').Router();
var User = require('../../../db').model('user'); // eslint-disable-line new-cap
module.exports = router;


router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next);
});

router.get('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		if (!user) { res.status(404).send(); }
		res.json(user);
	});
}); 
