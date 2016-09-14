'use strict';
var router = require('express').Router();
var Cart = require('../../../db').model('cart');
module.exports = router;

router.get('/:id', function(req, res, next) {
	Cart.findById(req.params.id)
	.then(function(cart) {
		if (!cart) { res.status(404).send(); }
		res.json(cart);
	});
}); 

