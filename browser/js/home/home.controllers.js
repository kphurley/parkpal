'use strict';

app.controller('HomeCtrl', function($scope, HomeFactory) {
	console.log(HomeFactory);
	HomeFactory.findAll()
	.then(function(parks) {
		$scope.parks = parks
	});

});