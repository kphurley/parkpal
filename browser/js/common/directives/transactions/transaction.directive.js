app.directive('transaction', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/transactions/transaction.html',
		controller: 'TransactionCtrl',
		resolve: {
			transactions: function($stateParams, TransactionFactory) {
				return [1,2,3]
			}
		}
	};
});