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
