'use strict';
var router = require('express').Router();
var Facility = require('../../../../db').model('facility'); // eslint-disable-line new-cap
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

router.use('/:id/slots', require('./slots'));
