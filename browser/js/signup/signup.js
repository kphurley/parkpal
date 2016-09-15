app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, $state, SignupFactory, AuthService) {

    $scope.error = null;

    $scope.sendSignup = function(data) {
        SignupFactory.createUser(data)
        .then(function(data) {
            console.log(data)
            var user = {};
            user.email = data.email;
            user.password = data.password;
            return AuthService.login(user)
        })
        .then(function() {
              $state.go('home');
        })
        .catch(function() {
            $scope.error = 'Invalid signup credentials. '
        })
    }

});
 