app.controller('UserCtrl', function($scope, UserFactory, $stateParams, $state) {

	UserFactory.getOne($stateParams.id)
	.then(function(user) {
		$scope.user = user;
	});

	//temporary transactions
	$scope.transactions = [1, 2, 3, 4];

	$scope.updateUser = function(userData) {
		UserFactory.updateUser(userData)
		.then(function(user) {
			$state.go('user.profile', {userId: user.id} );
		});
	};

});
