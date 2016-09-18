app.directive('oauthButton', function () {
  return {
    scope: {
      providerName: '@'
    },
    restrict: 'E',
    templateUrl: '/js/common/directives/oauthButtons/oauth-button.html'
  }
});