var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var Facility = db.model('facility');

describe('Facility model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    describe('create facility', function () {

      var facility, createFacility, wronglyStructuredFacility, createWrongFacility;

      beforeEach('Create a facility model', function() {
        facility = {
          name: 'Fake Facility',
          description: 'A fake facility'
        };
        wronglyStructuredFacility = {
          name: 'Wrong Facility'
        }
        createFacility = function() {
          return Facility.create(facility);
        }
        createWrongFacility = function() {
          return Facility.create(wronglyStructuredFacility);
        }
      })

      it('has required fields', function() {
        var createdFacility = createFacility().then(function(fac) {
          expect(fac).to.equal(facility);
        });
      });

      it('returns undefined when a required field is missing', function() {
        var createdFacility = createWrongFacility().then(function(fac) {
          expect(fac).to.equal(undefined);
        });
      })

    });

});

