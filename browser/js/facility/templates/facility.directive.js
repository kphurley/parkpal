//facility.directive.js
app.directive('facility', function() {
    return {
      restrict: 'E',
      templateUrl: 'facility.html'
      /*,
      scope: {

        width: '@', // '@', '&', '='
        height: '@' // '@', '&', '='
      },
      link: function(scope, element, attrs) {
        scope.getSrc = function() {
          if(!scope.width || !scope.height) { return; }
          return `http://placekitten.com/${scope.width}/${scope.height}`
        }
      }
      */
    }
  });
