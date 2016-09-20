app.controller('UserCtrl', function($scope, UserFactory, $stateParams, $state, TransactionFactory) {
	console.log("INSIDE USER CTRL");
	
	UserFactory.getOne($stateParams.id)
	.then(function(user) {
		$scope.user = user;
	});

	//temporary transactions
    TransactionFactory.getAllByUserId($stateParams.id)
        .then(function(transactions) {
          $scope.transactions = transactions;
      });

	$scope.updateUser = function(userData) {
		console.log("user data", userData);
		console.log("user data");
		UserFactory.updateUser(userData)
		.then(function(user) {
			$state.go('user.profile', {userId: user.id} );
		});
	};

});
