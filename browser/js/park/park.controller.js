app.controller('ParkCtrl', function($scope, parks) {
	$scope.parks = parks;
});

app.controller('SingleParkCtrl', function($scope, park, ParkFactory) {
  $scope.park = park;
  $scope.inSlots = false;
  //$scope.slots = null;

  //---For Date Chooser-----
  //$scope.valuationDate = new Date();
  $scope.valuationDatePickerIsOpen = false;

  $scope.valuationDatePickerOpen = function () {
    this.valuationDatePickerIsOpen = true;
  };


})
