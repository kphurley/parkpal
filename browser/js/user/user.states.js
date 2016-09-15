app.config(function($stateProvider) {

	$stateProvider.state('user', {
		url: '/users/:id',
		templateUrl: '/js/user/templates/userMain.html',
		controller: 'UserCtrl'
	});

	$stateProvider.state('user.profile', {
		url: '/profile',
		templateUrl: '/js/user/templates/userProfile.html',
		controller: 'UserCtrl'
	});

	$stateProvider.state('user.transactions', {
		url: '/profile',
		templateUrl: '/js/user/templates/userTransactions.html',
		controller: 'UserCtrl'
	});

});
