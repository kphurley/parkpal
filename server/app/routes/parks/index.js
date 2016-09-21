'use strict';
var router = require('express').Router();
var Park = require('../../../db').model('park'); // eslint-disable-line new-cap
module.exports = router;
var chalk = require('chalk');
var http = require('http');
var HTTPError = require('httperror');
var authAPI = require('../authAPI');


router.get('/', function(req, res, next) { // no auth needed
	Park.findAll()
	.then(function(parks) {
		res.json(parks);
	})
	.catch(next);
});

router.use('/:id', function(req, res, next) {
	Park.findById(req.params.id)
	.then(function(park) {
		if (!park) res.status(404).send("Error ");
		req.park = park;
		next()
	})
	.catch(next);
})

router.get('/:id', function(req, res, next) { // no auth need
	res.json(req.park);
});

router.put('/:id', authAPI.isAdmin, function(req, res, next) { // ONLY ADMINS
	Park.findById(req.params.id)
	.then(function (park) {
		return park.update(req.body);
	})
	.then(function(park) {
		if (!park) {next(new Error("this is not the park you are looking for"))}
		res.json(park);
	})
	.catch(next);
});

router.post('/', authAPI.isAdmin, function(req, res, next) { // ONLY ADMINS
	Park.create(req.body)
		.then(function(park) {
			res.json(park)
		})
		.catch(next)
})

router.use('/:id/facilities', require('./facilities'));


