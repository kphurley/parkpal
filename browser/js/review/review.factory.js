//review.factory.js
app.factory('ReviewFactory', function($http) {
  return {
    addReview: function(facility, newReview) {
      var url = '/api/parks/' + facility.parkId + '/facilities/' + facility.id + '/review';
      return $http.post(url, newReview)
      .then(function(res) {
        return res.data;
      })
    }
  }
})
