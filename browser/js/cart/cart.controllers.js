app.controller('CartCtrl', function($scope, userCart, userSlots, CartFactory) {
	// hardcoded for now
	// carts should be associated with a particular user
	/*CartFactory.findOne(1)
	.then(function(cartSlotsArray) {
		$scope.cart = cartSlotsArray[0];
		$scope.slots = cartSlotsArray[1];
		console.log("scope-slots", $scope.slots);

		var prices = $scope.slots.map(slot=> slot.price);
		$scope.subtotal = prices.reduce( (a,b) => a + b	)
		$scope.tax = Math.floor($scope.subtotal * 0.1);
		$scope.total = $scope.subtotal + $scope.tax;
	});*/

	$scope.cart = userCart;
	$scope.slots = userSlots;

	var prices = $scope.slots.map(slot=> slot.price);
	if(prices.length > 0){
		$scope.subtotal = prices.reduce( (a,b) => a + b	)
		$scope.tax = Math.floor($scope.subtotal * 0.1);
		$scope.total = $scope.subtotal + $scope.tax;
	}

	$scope.submitPayment = function() {
		CartFactory.submitPayment($scope.payment);
	}

});

