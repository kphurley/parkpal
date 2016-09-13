app.factory('ParkFactory', function($http) {
	var ParkFactory = {};

	var getData = function(res) {
		return res.data;
	}

	ParkFactory.findAll = function() {
		return $http.get('/api/parks')
		.then(getData);
	}

	ParkFactory.findOne = function(id) {
		return $http.get('/api/parks/' + id)
		.then(getData);
	}

	return ParkFactory;
})
