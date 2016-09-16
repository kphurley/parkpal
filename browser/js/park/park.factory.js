app.factory('ParkFactory', function($http, $q) {
	var ParkFactory = {};

	var getData = function(res) {
		return res.data;
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
			return park;
		})
	}

	ParkFactory.create = function(park) {
		return $http.post('/api/parks', park)
		.then(getData);
	}

	return ParkFactory;
})


/*var url = '/api/artists/' + id;
    return $q.all([$http.get(url), $http.get(url + '/songs'), $http.get(url + '/albums')])
    .then( function (responses) { return responses.map(getData); })
    .then( function (results) {
      var artist = results[0];
      var songs = results[1].map(SongFactory.convert);
      var albums = results[2].map(AlbumFactory.convert);
      artist.songs = songs;
      artist.albums = albums;
      return artist;
    });*/
