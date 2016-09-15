app.factory('SignupFactory', function($http) {
	var SignupFactory = {};


	SignupFactory.createUser = function (data) {
	var tempPass = data.password;
    return $http.post('/api/users', data)
    .then(function (response) {
      var user = response.data;
      user.password = tempPass;
      return user;
    });
  };

	return SignupFactory;
})
