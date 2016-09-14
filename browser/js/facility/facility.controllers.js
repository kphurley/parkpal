//facility.controllers.js
app.controller('DatepickerDemoCtrl', [
function () {

  var vm = this;

  vm.valuationDate = new Date();
  vm.valuationDatePickerIsOpen = false;

  vm.valuationDatePickerOpen = function () {

      this.valuationDatePickerIsOpen = true;
  };
}]);
