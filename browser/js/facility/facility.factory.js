app.factory('FacilityFactory', function($http) {

  var FacilityFactory = {};

  var getData = function(res) {
    return res.data;
  }

  var average = function(reviews) {
    if(reviews.length <= 0) return null;
    let sum = reviews.map(review => review.rating)
      .reduce((a,b) => a+b);
    return Math.round(sum / reviews.length);
  }

  FacilityFactory.findById = function(parkId, facilityId) {
    return $http.get('/api/parks/' + parkId + '/facilities/' + facilityId)
    .then(getData)
    .then(function(facility) {
      facility.averageRating = average(facility.reviews);
      return facility;
    });
  }

  FacilityFactory.updateFacility = function(parkId, facility) {
  	return $http.put('/api/parks/' + parkId + '/facilities/' + facility.id, facility)
  	.then(getData);
  }

  FacilityFactory.createFacility = function(facility) {
    return $http.post('/api/parks/' + facility.parkId + '/facilities/', facility)
    .then(getData);
  }

  return FacilityFactory;

});


