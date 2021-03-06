app.controller('AdminCtrl', function($scope, UserFactory, AdminFactory, $state, $stateParams) {

	UserFactory.getAll()
	.then(function(users) {
		$scope.users = users;
	});

	$scope.createNewUser = function(userData) {
		AdminFactory.createUser(userData)
		.then(function(user) {
			$state.go('admin.users');
		});
	};

	$scope.editUser = function(userData) {
		console.log("admin controller user data", userData);
		UserFactory.updateUser(userData)
		.then(function(user) {
			$state.go('admin.users');
		});
	};

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
			$state.go('admin.parks.editPark', { parkId: park.id, parkToEdit: park});
		});
	};

	$scope.editPark = function(parkData) {
		ParkFactory.updatePark(parkData)
		.then(function(park) {
			$state.go('admin.parks.list');
		});
	};

});

app.controller('AdminParkFacilityCtrl', function($scope, $stateParams, ParkFactory, FacilityFactory, $state, SlotFactory) {

	$scope.createSlots = function() {
		SlotFactory.createSlots($scope.newSlot, $stateParams.facilityId, $stateParams.parkId)
		.then(function(slots) {
			console.log(slots)
		})
	}

	ParkFactory.findOne($stateParams.parkId)
	.then(function(park) {
		$scope.park = park;
	})

	$scope.updateFacility = function(parkId, facilityToEdit) {

		FacilityFactory.updateFacility(parkId, facilityToEdit)
		.then(function (facility) {
			console.log(facility);
			$state.go('admin.parks.list');
		});

	}

	$scope.createFacility = function(facility) {
		facility.parkId = $stateParams.parkId;
		FacilityFactory.createFacility(facility)
		.then(function(newFacility) {
			$scope.facility = newFacility;
			$state.go('admin.parks.editPark.facilities', {
				parkId: newFacility.parkId
				},
				{reload: true});
		})
	}

	$scope.facilityToEdit = $stateParams.facilityToEdit;
});














