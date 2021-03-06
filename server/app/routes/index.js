'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/members', require('./members'));

router.use('/parks', require('./parks'));

router.use('/carts', require('./carts'));

router.use('/users', require('./users'));

router.use('/payment', require('./payment'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
