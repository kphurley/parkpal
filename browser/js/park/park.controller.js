app.controller('ParkCtrl', function($scope, parks) {
	$scope.parks = parks;
});

app.controller('SingleParkCtrl', function($scope, park) {
  $scope.park = park;
})
