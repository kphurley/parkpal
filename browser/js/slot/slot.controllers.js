//slot.controllers.js
//
// This controller should be nested inside of another, where we have
// access to parkId on the parent scope
//
app.controller('SlotsCtrl', function($scope, SlotFactory, slots, facility, $state) {
  $scope.slots = slots;
  $scope.facility = facility;
  $scope.inSlots = true;
})
