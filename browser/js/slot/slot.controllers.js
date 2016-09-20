//slot.controllers.js
//
// This controller should be nested inside of another, where we have
// access to parkId on the parent scope
//
app.controller('SlotsCtrl', function($scope, SlotFactory, ParkFactory, slots, facility, $state) {
 // $scope.slots = slots;
  $scope.facility = facility;
  $scope.inSlots = true;

  $scope.findSlots = function() {

    SlotFactory.findSlotsByDate($scope.park.id, $scope.facility.id, $scope.valuationDate)
    .then(function(_slots) {
      _slots.forEach((slot) => {
            // slot.startTimeConverted = SlotFactory.convertTime(slot.startTime);
            // slot.endTimeConverted = SlotFactory.convertTime(slot.endTime);
          });
      $scope.slots = _slots;

    });
  }

  $scope.addToCart = function(slotId) {
    SlotFactory.addToCart($scope.park.id, $scope.facility.id, slotId)
    .then(function(slot) {
      $state.go('park.facilitySlots.checkout',
                {id: $scope.park.id, facilityId: $scope.facility.id},
                {reload: true});
    })
  }

});

