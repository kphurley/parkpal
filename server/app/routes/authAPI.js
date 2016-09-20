
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
	if (!req.user) {
		res.status(401).end()
		}
	if (!req.user.isAdmin) {
		res.status(403).end();
	}
	next()
}



module.exports = authAPI;