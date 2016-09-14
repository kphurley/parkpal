app.factory('HomeFactory', function($http) {
	var homeAPI = {};

	function getData (res) { return res.data }

	homeAPI.findAll = function() {
		return $http.get('/api/parks')
		.then(getData);
	}
	return homeAPI;
});