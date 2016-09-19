//slot.factory.js
app.factory('SlotFactory', function($http, CartFactory, AuthService) {

  var getData = function(res) {
    return res.data;
  }

  return {
    findAllSlotsInFactory: function(parkId, facilityId) {
      return $http.get('/api/parks/' + parkId + '/facilities/' + facilityId + '/slots')
      .then(getData)
      .then(function(slots) {
        slots.sort((a,b) => a.startTime - b.startTime );
        return slots;
      });
    },
    findSlotsByDate: function(parkId, facilityId, date) {
      var dateToPass = new Date(date).getTime();
      return $http.get('/api/parks/' + parkId + '/facilities/' + facilityId + '/slots/' + dateToPass)
      .then(getData)
      .then(function(slots) {
        slots.sort((a,b) => a.startTime - b.startTime );
        return slots;
      });
    },
    findUserCartSlots: function(userId) {
      return CartFactory.findUserCart(userId)
      .then(function(cart) {
        return $http.get('/api/carts/' + cart.id + '/slots');
      })
      .then(function(slots) {
        console.log('slots in slot factory',slots);
        return slots.data;
      });
    },
    convertTime: function(militaryTime) {
      let stringifiedTime = String(militaryTime);
      if(militaryTime < 1000) {
        return Math.floor(militaryTime/100) + ':' + stringifiedTime.substr(1) + ' AM';
      }
      else if(militaryTime <= 1200){
        return Math.floor(militaryTime/100) + ':' + stringifiedTime.substr(2) + ' AM';
      }
      else{
        let pmTime = militaryTime - 1200;
        return Math.floor(pmTime/100) + ':' + stringifiedTime.substr(2) + ' PM';
      }
    },
    //Needs work...but should be OK for a logged in user
    addToCart: function(parkId, facilityId, slotId) {
      return AuthService.getLoggedInUser()
      .then(function(user) {
        return CartFactory.findUserCart(user.id);
      })
      .then(function(cart) {
        return $http.post('/api/parks/' + parkId + '/facilities/' + facilityId + '/slots/' + slotId, {cartId: cart.id});
      })
      .then(getData);
    }
  }
})
