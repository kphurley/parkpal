var sinon = require('sinon');
var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../../server/db');
var Park = db.model('park');

describe('Park model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    describe('create Park', function () {
      var minimumParkInfo, allParkInfo;

      beforeEach('Create a single Park', function() {
        minimumParkInfo = {
          id: 1,
          name: 'Testing Park Name',
          description: 'This is a test park description',
          email: 'test@park.org',
          phone: '123456789' 
        }

        allParkInfo = {
          id: 2,
          name: 'Testing Park Name',
          address: 'Testing Park Address Line',
          city: "Testing Park City",
          state: "Testing Park State",
          zip: 555555,
          description: 'This is a test park description',
          imageUrl: 'testParkImageUrl.jpg',
          email: 'test@park.org',
          phone: '123456789'
        };



      })

      it('can create a park with minimum required info', function(done) {
        var newPark = Park.create(minimumParkInfo)
          .then(function(_newPark) {
            let newPark = _newPark.dataValues;
              expect(_newPark.id).to.be.equal(1);
              expect(_newPark.name).to.be.equal('Testing Park Name');
              expect(_newPark.description).to.be.equal('This is a test park description');
              expect(_newPark.email).to.be.equal('test@park.org');
              expect(_newPark.phone).to.be.equal('123456789');
              done();
          });
      });

      it('can create a park with all info fields', function(done) {
        var newPark = Park.create(allParkInfo)
          .then(function(_newPark) {
             expect(_newPark.id).to.be.equal(2);
             expect(_newPark.name).to.be.equal('Testing Park Name');
             expect(_newPark.description).to.be.equal('This is a test park description');
             expect(_newPark.email).to.be.equal('test@park.org');
             expect(_newPark.phone).to.be.equal('123456789');
             expect(_newPark.address).to.be.equal('Testing Park Address Line');
             expect(_newPark.city).to.be.equal('Testing Park City');
             expect(_newPark.state).to.be.equal('Testing Park State');
             expect(_newPark.zip).to.be.equal(555555);
             expect(_newPark.imageUrl).to.be.equal('testParkImageUrl.jpg');
             done();
          });
      });

      


    });

});

