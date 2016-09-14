app.config(function($stateProvider) {
	$stateProvider.state('parks', {
		url: '/parks',
		templateUrl: '/js/park/templates/park.list.html',
		controller: 'ParkCtrl',
		resolve: {
			parks: function (ParkFactory) { return ParkFactory.findAll(); }
		}
	})
  .state('park', {
    url: '/park/:id',
    templateUrl: '/js/park/templates/park.single.html',
    controller: 'SingleParkCtrl',
    resolve: {
      park: function(ParkFactory, $stateParams) {
        return ParkFactory.findOne($stateParams.id);
      }
    }
  })

  .state('park.description', {
    url: '/',
    templateUrl: '/js/park/templates/park.description.html'
  })
  .state('park.facilities', {
    url: '/facilities',
    templateUrl: '/js/facility/templates/facilities.html'
  })
  .state('park.facilitySlots', {
    url: '/facility/:facilityId',
    //abstract: true,
    templateUrl: '/js/slot/templates/facility-slots.html',
    controller: 'SlotsCtrl',
    resolve: {
      slots: function(SlotFactory, $stateParams) {
        return SlotFactory.findAllSlotsInFactory($stateParams.id, $stateParams.facilityId)
        .then(function(slots) {
          slots.forEach((slot) => {
            slot.startTimeConverted = SlotFactory.convertTime(slot.startTime);
            slot.endTimeConverted = SlotFactory.convertTime(slot.endTime)
          });
          return slots;
        })
      },
      facility: function(FacilityFactory, $stateParams) {
        return FacilityFactory.findById($stateParams.id, $stateParams.facilityId);
      }
    }
  })
  .state('park.facilitySlots.slots', {
    url: '/slots',
    templateUrl: '/js/slot/templates/slots.html'
  })
})
