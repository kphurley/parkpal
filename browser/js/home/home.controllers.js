'use strict';

app.controller('HomeCtrl', function($scope, HomeFactory) {
	HomeFactory.findAll()
	.then(function(parks) {
		$scope.parks = parks
	});

});