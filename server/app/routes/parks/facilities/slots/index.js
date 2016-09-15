'use strict';
var router = require('express').Router();
var Slot = require('../../../../../db').model('slot'); // eslint-disable-line new-cap
module.exports = router;

router.get('/', function(req, res, next) {
  Slot.findAll({
    where: {
      facilityId: req.facility.id
    }
  })
  .then(function(slots) {
    res.json(slots);
  })
  .catch(next);
})

router.get('/:date', function(req, res, next) {
  //var date = req.params.date;
  Slot.findAll({
    where: {
      facilityId: req.facility.id,
      date: req.params.date
    }
  })
  .then(function(slots) {
    res.json(slots);
  })
  .catch(next);
})

router.post('/:id', function(req, res, next) {
  var toUpdate = {
    cartId: req.body.cartId,
    booked: true
  };
  Slot.findById(req.params.id)
  .then(function(slot){
    slot.update(toUpdate)})
  .then(function(newSlot) {
    res.status(200).json(newSlot);
  })
  .catch(next);
});

