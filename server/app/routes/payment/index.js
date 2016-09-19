'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var stripe = require("stripe")(
  "sk_test_4HMKLJ9NEFm1umuSaXIiFt3p"  //secret stripe key
);

module.exports = router;
var _ = require('lodash');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.post('/', ensureAuthenticated, function (req, res, next) {
  stripe.tokens.create({
    card: {
      "number": '4242424242424242',
      "exp_month": 12,
      "exp_year": 2017,
      "cvc": '123'
    }
  }, function(err, token) {
    if(err) next(err);
    else{
      console.log('TOKEN: ', token);
      stripe.charges.create({
        amount: 2000,
        currency: "usd",
        source: token.id,
        description: "Charge for mason.thompson@example.com"
      }, function(err, charge) {
        if(err) next(err);
        console.log('CHARGE OBJECT FROM STRIPE:', charge);
      });
    }
  });
});


