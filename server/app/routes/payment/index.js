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
      "number": req.body.cardNumber,
      "exp_month": req.body.exp_month,
      "exp_year": req.body.exp_year,
      "cvc": req.body.cvc
    }
  }, function(err, token) {
    if(err) next(err);
    else{
      console.log('TOKEN: ', token);
      stripe.charges.create({
        amount: (+req.body.payment * 100),
        currency: "usd",
        source: token.id,
        description: ("Charge for " + req.body.nameOnCard + " - " + req.body.email)
      }, function(err, charge) {
        if(err) next(err);
        res.status(200).send();
      });
    }
  });
});


