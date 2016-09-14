app.factory('CartFactory', function($http, $q) {

	var cartAPI = {};

	var getData = function(res) { return res.data };

	cartAPI.findOne = function(id) {
		let url = "/api/carts/" + id + "/";

		return $q.all([$http.get(url), $http.get(url + "slots")])
		.then(function(responses) { return responses.map(getData)} );
		// returns array of data where index 0 is cartId, index 1 is slots
	};

	return cartAPI;

});