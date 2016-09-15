'use strict';
var router = require('express').Router();
var User = require('../../../db').model('user');
var Cart = require('../../../db').model('cart');
module.exports = router;

router.get('/:id', function(req, res, next) {
	User.findById(req.params.id)
	.then(function(user) {
		if (!user) { res.status(404).send(); }
		res.json(user);
	});
});
