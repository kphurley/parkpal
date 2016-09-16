app.config(function ($stateProvider) {


	$stateProvider.state('admin', {
		url: '/admin/:id',
		templateUrl: '/js/admin/templates/admin-main-page.html',
		controller: 'AdminCtrl'
	});

	$stateProvider.state('admin.users', {
		url: '/users',
		templateUrl: '/js/admin/templates/userslist.html',
		controller: 'AdminCtrl'
	});

	$stateProvider.state('admin.newUser', {
		url: '/newUser',
		templateUrl: '/js/admin/templates/newUser.html',
		controller: 'AdminCtrl'
	})

	$stateProvider.state('admin.editUser', {
		url: '/editUser/:userId',
		templateUrl: '/js/admin/templates/editUser.html',
		params: {userId: null, userToEdit: null},
		controller: 'AdminCtrl'
	})

	$stateProvider.state('admin.parks', {
		url: '/parks',
		templateUrl: '/js/admin/templates/parks.html',
		controller: 'AdminParkCtrl'
	})

	$stateProvider.state('admin.parks.list', {
		url: '/',
		templateUrl: '/js/admin/templates/parkslist.html',
		controller: 'AdminParkCtrl'
	})

	$stateProvider.state('admin.parks.new', {
		url: '/new',
		templateUrl: '/js/admin/templates/newParkTemplate.html',
		controller: 'AdminParkCtrl'
	})
	
	$stateProvider.state('admin.parks.editPark', {
		url: '/:parkId',
		templateUrl: '/js/admin/templates/editPark.html',
		params: {parkId: null, parkToEdit: null},
		controller: 'AdminParkCtrl'
	})


});