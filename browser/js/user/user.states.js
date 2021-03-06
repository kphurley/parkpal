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
		url: '/transactions',
		templateUrl: '/js/user/templates/userTransactions.html',
		controller: 'UserCtrl',
    resolve: {
      transactions: function($stateParams, TransactionFactory) {
        return TransactionFactory.getAllByUserId($stateParams.id);
      }
    }
	});

	$stateProvider.state('user.cart', {
    url: '/cart',
    templateUrl: '/js/user/templates/userCart.html',
    controller: 'CartCtrl',
    resolve: {
      userCart: function($stateParams, CartFactory) {
        return CartFactory.findUserCart($stateParams.id);
      },
      userSlots: function($stateParams, SlotFactory) {
      	return SlotFactory.findUserCartSlots($stateParams.id)
      	.then(function(slots){
      		slots.forEach((slot) => {
            slot.startTimeConverted = SlotFactory.convertTime(slot.startTime);
            slot.endTimeConverted = SlotFactory.convertTime(slot.endTime);
          });
      		return slots;
      	});
      }
    }
  });

  $stateProvider.state('user.removeFromCart', {
    url: '/removeFromCart',
    templateUrl: '/js/user/templates/userRemoveFromCart.html'
  })

});
