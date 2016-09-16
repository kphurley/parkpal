var router = require('express').Router();
var Transaction = require('../../../../db').model('transaction');
module.exports = router;

var chalk = require('chalk');

// router.use('/', function(req, res, next) {
// 	console.log('USER      ", /', req.reqUser);
// 	next();
// });

router.get('/', function(req, res, next) {
 	Transaction.findAll( { where: { userId: req.reqUser.id } })
 	.then(function(transactions) {
 		res.json(transactions);
 	});
});


router.get('/:id', function(req, res, next) {
 	Transaction.findById(req.params.id)
 	.then(function(transaction) {
 		res.json(transaction);
 	});
});
