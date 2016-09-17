'use strict';

app.controller('HomeCtrl', function($scope, HomeFactory, $state) {
	HomeFactory.findAll()
	.then(function(parks) {
		$scope.parks = parks
	});

	$scope.goToPark = function(parkId)  {
		$state.go('park', {id: parkId});
	}

});