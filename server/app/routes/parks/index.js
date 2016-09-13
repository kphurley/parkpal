'use strict';
var router = require('express').Router();
var Park = require('../../../db').model('park'); // eslint-disable-line new-cap
module.exports = router;

router.get('/', function(req, res, next) {
	Park.findAll()
	.then(function(parks) {
		res.json(parks);
	})
	.catch(next);
});

router.get('/:id', function(req, res, next) {
	Park.findById(req.params.id)
	.then(function(park) {
		res.json(park);
	})
	.catch(next);
});


