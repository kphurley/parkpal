var router = require('express').Router();
var Transaction = require('../../../../db').model('transaction');
var Slot = require('../../../../db').model('slot');
var Facility = require('../../../../db').model('facility');
module.exports = router;

var chalk = require('chalk');

// router.use('/', function(req, res, next) {
// 	console.log('USER      ", /', req.reqUser);
// 	next();
// });

router.get('/', function(req, res, next) {
	/*var rawSql = `SELECT * FROM "transactions" AS "transaction"
	LEFT OUTER JOIN "slots" AS "slot" ON "transaction"."id" = "slot"."transactionId"
	LEFT OUTER JOIN "facilities" AS "slot.facility" ON "slot"."facilityId" = "slot.facility"."id";`*/

 	Transaction.findAll( {
 		where: { userId: req.reqUser.id },
 		include: [{
 			model: Slot,
 			include: [Facility]
 		}]
	 })
 							// include: [Slot, {model: Facility,
 							// 				through: { attributes: ['id']}}]} )
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
