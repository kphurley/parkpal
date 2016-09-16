app.factory('UserFactory', function($http) {
	var userAPI = {}

	function getData (res) { return res.data }

	userAPI.getOne = function(userId) {
		return $http.get('/api/users/' + userId)
		.then(getData)
	}

	userAPI.getAll = function() {
		return $http.get('/api/users/')
		.then(getData)
	}

	return userAPI;
});

