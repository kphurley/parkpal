//slot.factory.js
app.factory('SlotFactory', function($http) {

  var getData = function(res) {
    return res.data;
  }

  return {
    findAllSlotsInFactory: function(parkId, facilityId) {
      return $http.get('/api/parks/' + parkId + '/facilities/' + facilityId + '/slots')
      .then(getData);
    },
    convertTime: function(militaryTime) {
      let stringifiedTime = String(militaryTime);
      if(militaryTime <= 1200) {
        return Math.floor(militaryTime/100) + ':' + stringifiedTime.substr(2) + ' AM';
      }
      else{
        let pmTime = militaryTime - 1200;
        return Math.floor(pmTime/100) + ':' + stringifiedTime.substr(2) + ' PM';
      }
    }
  }
})
