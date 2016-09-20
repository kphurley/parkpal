var fs = require('fs');
var parkJSONstr, facilityJSONstr;
var parkData, facilityData;
var parkDataFormatted = [], facilityDataFormatted = [];

fs.readFile('./chicago_park_facilities.json', function(err, data) {
  if(err) throw err;
  parkJSONstr = data.toString();
  parkData = JSON.parse(parkJSONstr);
  var parkColumnNames = parkData.meta.view.columns.map(col=>col.name);

  for(var row=0; row<parkData.data.length; row++){
    var rowObj = {}
    for(var col=0; col< parkColumnNames.length; col++){
      rowObj[parkColumnNames[col]] = parkData.data[row][col];
    }
    parkDataFormatted.push(rowObj);
  }
  console.log(parkDataFormatted);
})

fs.readFile('./chicago_parks.json', function(err, data) {
  if(err) throw err;
  facilityJSONstr = data.toString();
  facilityData = JSON.parse(facilityJSONstr);
  var facilityColumnNames = facilityData.meta.view.columns.map(col=>col.name);

  for(var row=0; row<facilityData.data.length; row++){
    var rowObj = {}
    for(var col=0; col< facilityColumnNames.length; col++){
      rowObj[facilityColumnNames[col]] = facilityData.data[row][col];
    }
    facilityDataFormatted.push(rowObj);
  }
  //console.log(facilityDataFormatted);
})
