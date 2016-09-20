'use strict';
var router = require('express').Router();
var Cart = require('../../../db').model('cart');
var Slot = require('../../../db').model('slot');
var chalk = require('chalk');

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

router.param('userId', function (req, res, next) {
  Cart.findOne({ where: { userId: req.params.userId}, include:[Slot] })
  .then(cart => {
    if (!cart) {
      const err = Error('Cart not found');
      next(err);
    }
    req.cart = cart;
    next();
  })
  .catch(next);
});

//get userId's cart
router.get('/user/:userId', function(req, res, next) {
  res.json(req.cart);
});

//remove slotId from userId's cart
//route is /api/carts/user/:slotId
router.put('/user/:slotId', function(req, res, next) {
  var toUpdate = {
    cartId: null,
    booked: false
  };
  Slot.findById(req.params.slotId)
  .then(function(slot){
    return slot.update(toUpdate)})
  .then(function(newSlot) {
    res.status(200).json(newSlot);
  })
  .catch(next);
});
/*router.put('/user/:userId', function(req, res, next) {
  req.cart.removeSlot(req.body.slotId)
  .then(cart => res.status(200))
  .catch(next);
})*/

/*var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};*/


