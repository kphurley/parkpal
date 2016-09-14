'use strict';
var router = require('express').Router();
var Cart = require('../../../db').model('cart');
var Slot = require('../../../db').model('slot');
module.exports = router;

router.get('/:id', function(req, res, next) {
	Cart.findById(req.params.id)
	.then(function(cart) {
		if (!cart) { res.status(404).send(); }
		res.json(cart);
	});
}); 


router.get('/:id/slots', function(req, res, next) {
	Slot.findAll( { where: { cartId: req.params.id} })
	.then(function(slots) {
		res.json(slots);
	});
}); 
