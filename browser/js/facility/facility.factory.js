app.factory('FacilityFactory', function($http) {

  var FacilityFactory = {};

  var getData = function(res) {
    return res.data;
  }

  FacilityFactory.findById = function(parkId, facilityId) {
    return $http.get('/api/parks/' + parkId + '/facilities/' + facilityId)
    .then(getData);
  }


  return FacilityFactory;

});


