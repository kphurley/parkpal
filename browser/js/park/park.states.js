app.config(function($stateProvider) {
	$stateProvider.state('parks', {
		url: '/parks',
		templateUrl: '/js/park/templates/park.list.html',
		controller: 'ParkCtrl',
		resolve: {
			parks: function (ParkFactory) { return ParkFactory.findAll(); }
		}
	})
})
