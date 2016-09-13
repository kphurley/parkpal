app.config(function($stateProvider) {
	$stateProvider.state('parks', {
		url: '/parks',
		templateUrl: '/js/park/templates/park.list.html',
		controller: 'ParkCtrl',
		resolve: {
			parks: function (ParkFactory) { return ParkFactory.findAll(); }
		}
	})
  .state('park', {
    url: '/park/:id',
    templateUrl: '/js/park/templates/park.single.html',
    controller: 'SingleParkCtrl',
    resolve: {
      park: function(ParkFactory, $stateParams) {
        return ParkFactory.findOne($stateParams.id);
      }
    }
  })

  .state('park.description', {
    url: '/',
    templateUrl: '/js/park/templates/park.description.html'
  })
  .state('park.facilities', {
    url: '/facilities',
    templateUrl: '/js/facility/templates/facilities.html'
  })
})
