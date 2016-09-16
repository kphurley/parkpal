app.controller('AdminCtrl', function($scope, UserFactory, AdminFactory, $state, $stateParams) {

	UserFactory.getAll()
	.then(function(users) {
		$scope.users = users;
	});

	$scope.createNewUser = function(userData) {
		AdminFactory.createUser(userData)
		.then(function(user) {
			$state.go('admin.users')
		})
	}

 	$scope.userToEdit = $stateParams.userToEdit;

	
});


app.controller('AdminParkCtrl', function($scope, ParkFactory, $state, $stateParams) {

	$scope.parkToEdit = $stateParams.parkToEdit

	ParkFactory.findAll()
	.then(function(parks) {
		$scope.parks = parks;
	})

	$scope.createPark = function(park) {
		ParkFactory.create(park)
		.then(function(park) {
			$scope.park = park;
			$state.go('admin.parks.editPark', { parkId: park.id, parkToEdit: park})
		})
	}

	
});