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
    $scope.formattedDate = ParkFactory.formatDate($scope.valuationDate);
    SlotFactory.findSlotsByDate($scope.park.id, $scope.facility.id, $scope.formattedDate)
    .then(function(_slots) {
      _slots.forEach((slot) => {
            slot.startTimeConverted = SlotFactory.convertTime(slot.startTime);
            slot.endTimeConverted = SlotFactory.convertTime(slot.endTime);
          });
      $scope.slots = _slots;

    });
  }

  $scope.addToCart = function(slotId) {
    SlotFactory.addToCart($scope.park.id, $scope.facility.id, slotId)
    .then(function(slot) {
      console.log('slot added to cart:', slot);
      $state.go('park.facilitySlots.checkout',
                {id: $scope.park.id, facilityId: $scope.facility.id});
    })
  }
});

