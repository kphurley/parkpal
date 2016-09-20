//review.controllers.js
app.controller('NewReviewCtrl', function($scope, ReviewFactory, $state) {
  $scope.createReview = function(){
    ReviewFactory.addReview($scope.facility, $scope.newReview)
    .then(function(){
      $state.go('park.facilitySlots.slots', {id: $scope.facility.parkId, facilityId: $scope.facility.id}, {reload: true});
    });
  }
})
