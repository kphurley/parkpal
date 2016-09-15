app.factory('SignupFactory', function($http) {
	var SignupFactory = {};


	SignupFactory.createUser = function (data) {
    return $http.post('/api/users', data)
    .then(function (response) {
      var user = response.data;
      return user;
    });
  };

	return SignupFactory;
})
