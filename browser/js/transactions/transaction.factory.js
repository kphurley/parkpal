app.factory('TransactionFactory', function($http) {

	var transactionAPI = {};

	function getData(res) { return res.data; }

	transactionAPI.getAllByUserId = function(userId) {
		return $http.get('/api/users/' + userId + '/transactions')
		.then(getData);
	};

	transactionAPI.getById = function(transactionId) {

	};

	return transactionAPI;

});