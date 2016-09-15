app.controller('UserCtrl', function($scope, UserFactory, $stateParams) {

	UserFactory.getOne($stateParams.id)
	.then(function(user) {
		$scope.user = user;
	});

	//temporary transactions
	$scope.transactions = [1, 2, 3, 4];

});
