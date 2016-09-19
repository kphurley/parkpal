'use strict';
var router = require('express').Router();
var Slot = require('../../../../../db').model('slot'); // eslint-disable-line new-cap
module.exports = router;
var chalk = require('chalk');

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
  var selectedDate = new Date(+req.params.date);
  var endOfSelectedDate = new Date(+req.params.date + 24*60*60*1000)
  console.log(chalk.blue("INSIDE THE DATE ROUTE"), endOfSelectedDate);
  Slot.findAll({
    where: {
      facilityId: req.facility.id,
      startTime: {
        $between: [selectedDate, endOfSelectedDate]
      }
    },
    order: [['startTime', 'DESC']]
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
    return slot.update(toUpdate)})
  .then(function(newSlot) {
    res.status(200).json(newSlot);
  })
  .catch(next);
});

