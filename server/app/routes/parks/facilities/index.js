'use strict';
var router = require('express').Router();
var Facility = require('../../../../db').model('facility'); // eslint-disable-line new-cap
var chalk = require('chalk');
module.exports = router;

router.use('/', function(req, res, next) {
	next();
})

router.get('/', function(req, res, next) {
	Facility.findAll({
		where: {
			parkId: req.park.id
		}
	})
	.then(function(facilities) {
		res.json(facilities);
	})
	.catch(next);
})

router.use('/:id', function(req, res, next) {
	Facility.findById(req.params.id)
	.then(function(facility) {
		if (!facility || !req.park) res.status(404).send("Error ");
		if (req.park.id !== facility.parkId) res.status(401).send('not authorized ');
		req.facility = facility;
		next()
	})
	.catch(next);
})

router.get('/:id', function(req, res, next) {
	res.json(req.facility);
})

router.put('/:id', function(req, res, next) {
	Facility.findById(req.params.id)
	.then(function(facility) {
		return facility.update(req.body)
	})
	.then(function(updatedFacility) {
		res.json(req.facility);
	})
	.catch(next);
})

router.post('/', function(req, res, next) {
	Facility.create(req.body)
	.then(function(facility) {
		res.json(facility)
		console.log(facility);
	})
	.catch(next);
});

router.use('/:id/slots', require('./slots'));
