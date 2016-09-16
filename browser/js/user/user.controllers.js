app.controller('UserCtrl', function($scope, UserFactory, $stateParams, $state, TransactionFactory) {

	UserFactory.getOne($stateParams.id)
	.then(function(user) {
		$scope.user = user;
	});

	//temporary transactions
    TransactionFactory.getAllByUserId($stateParams.id)
        .then(function(transactions) {
          console.log(transactions);
          $scope.transactions = transactions;
      });

	$scope.updateUser = function(userData) {
		UserFactory.updateUser(userData)
		.then(function(user) {
			$state.go('user.profile', {userId: user.id} );
		});
	};

});
