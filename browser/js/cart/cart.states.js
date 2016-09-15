app.config(function($stateProvider) {
  $stateProvider.state('user.addToCart', {
    url: '/addToCart',
    templateUrl: '/js/cart/templates/cart.html',
    controller: 'CartCtrl'
  })
});

