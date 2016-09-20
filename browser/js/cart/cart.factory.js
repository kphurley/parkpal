app.factory('CartFactory', function($http, $q, $state) {

	var cartAPI = {};

	var getData = function(res) { return res.data };

	cartAPI.findOne = function(id) {
		let url = "/api/carts/" + id + "/";

		return $q.all([$http.get(url), $http.get(url + "slots")])
		.then(function(responses) { return responses.map(getData)} );
		// returns array of data where index 0 is cartId, index 1 is slots
	}

  cartAPI.findUserCart = function(userId) {

    let url = "/api/carts/user/" + userId;

    return $http.get(url)
    .then(function(responses) { return getData(responses) });

  }

  cartAPI.submitPayment = function(payment, total) {
    payment.payment = total;
    return $http.post('/api/payment', payment)
    .then(getData);
  }

  //Should remove slotId from userId's cart - UNFINISHED!!
  /*cartAPI.removeFromCart = function(userId, slotId) {
    var slotMod = {slotId: slotId, booked: false}
    return $http.put('/api/carts/user/' + userId, slotMod)
    .then(function() {
      return cartAPI.findUserCart(userId);
    });
  }*/

	return cartAPI;

});


