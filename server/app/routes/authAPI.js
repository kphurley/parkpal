var chalk = require('chalk');

var authAPI = {};

authAPI.isLoggedIn = function(req, res, next) {
	if (!req.user) {
		res.status(401).end();
	}
	next()
}

authAPI.isMe = function(req, res, next) {
	if ((req.user.id !== req.reqUser.id) && !req.user.isAdmin) {
		res.status(401).end();
	}
	next()
}

authAPI.isAdmin = function (req, res, next) {
	console.log(chalk.yellow("req.user", req.user))
	if (!req.user) {
		res.status(401)
		next(new Error)
		}
	if (!req.user.isAdmin) {
		res.status(403)
		next(new Error);
	}
	next()
}



module.exports = authAPI;