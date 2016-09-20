app.factory('ParkFactory', function($http, $q) {
	var ParkFactory = {};

	var getData = function(res) {
		return res.data;
	}

  var average = function(reviews) {
    if(reviews.length <= 0) return null;
    let sum = reviews.map(review => review.rating)
      .reduce((a,b) => a+b);
    return Math.round(sum / reviews.length);
  }

	ParkFactory.findAll = function() {
		return $http.get('/api/parks')
		.then(getData);
	}


	ParkFactory.findOne = function(id) {
		var url = '/api/parks/' + id;
		return $q.all([$http.get(url), $http.get(url + '/facilities')])
		.then(function(responses) {
			return responses.map(getData);
		})
		.then(function(results) {
			var park = results[0];
			park.facilities = results[1];
      park.facilities.forEach(facility =>
        facility.averageRating = average(facility.reviews));
			return park;
		})
	}


	ParkFactory.create = function(park) {
		return $http.post('/api/parks', park)
		.then(getData);
	}

  ParkFactory.formatDate = function(date) {
    if(!date) return;
    return date.toISOString().substr(0,10); //yyyy-mm-dd
  }

  ParkFactory.updatePark = function(parkData) {
		return $http.put('/api/parks/' + parkData.id, parkData)
		.then(getData)
  }


	return ParkFactory;
})

