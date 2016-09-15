app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, $state, SignupFactory) {

    $scope.error = null;

    $scope.sendSignup = function(data) {
        SignupFactory.createUser(data)
        .then(function() {
            $state.go('home');
        })
        .catch(function() {
            $scope.error = 'Invalid signup credentials. '
        })
    }

});
