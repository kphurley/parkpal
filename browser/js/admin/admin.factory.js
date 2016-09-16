app.factory('AdminFactory', function($http) {
	var adminAPI = {};

	function getData (res) { return res.data; }

	adminAPI.createUser = function(userData) {
		return $http.post('/api/users', userData)
		.then(getData)
	}
	return adminAPI;
});