app.controller('ParkCtrl', function($scope, parks) {
	$scope.parks = parks;
});

app.controller('SingleParkCtrl', function($scope, park, ParkFactory) {
  $scope.park = park;
  $scope.inSlots = false;

  //---For Date Chooser-----

  $scope.valuationDatePickerIsOpen = false;

  $scope.valuationDatePickerOpen = function () {
    this.valuationDatePickerIsOpen = true;
  };


})
