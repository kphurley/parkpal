'use strict';
var router = require('express').Router();
var Facility = require('../../../../db').model('facility'); // eslint-disable-line new-cap
var Review = require('../../../../db').model('review');
module.exports = router;

router.use('/', function(req, res, next) {
	next();
})

router.get('/', function(req, res, next) {
	Facility.findAll(
		{
			where: {
				parkId: req.park.id
			},
			include: [Review]
	})
	.then(function(facilities) {
		res.json(facilities);
	})
	.catch(next);
})

router.use('/:id', function(req, res, next) {
	Facility.findById(req.params.id, {include: [Review]})
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

router.post('/:id/review', function(req, res, next) {
	var cleanReview = {
		title: req.body.title,
		rating: req.body.rating,
		text: req.body.text,
		userId: req.user.id
	}
	Review.create(cleanReview)
	.then(function(review){
		req.facility.addReview(review);
	})
	.then(function(){
		res.status(201).send('Review created.');
	})
	.catch(next);
})

router.use('/:id/slots', require('./slots'));
