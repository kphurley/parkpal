// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Users Route', function () {

    var app, User;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

  describe('Get all users request (\'/api/users\')', function () {

    var guestAgent;

    var users = [
      {
        email: 'joe@gmail.com',
        password: 'shoopdawoop'
      },
      {
        email: 'jim@gmail.com',
        password: 'shoopdawoop2'
      }

    ];

    beforeEach('Create guest agent', function () {
      guestAgent = supertest.agent(app);
    });

    beforeEach('Create a user', function (done) {
      return User.bulkCreate(users).then(function (user) {
                done();
            }).catch(done);
    });

    it('should get all of the users', function (done) {
      guestAgent.get('/api/users').expect(200).end(function (err, response) {
        if (err) return done(err);
        expect(response.body[0].email).to.equal(users[0].email);
        expect(response.body[1].email).to.equal(users[1].email);
        done();
      });
    });

  });

  describe('Get a single user', function () {

    describe('Unauthenticated request', function () {

      var guestAgent;
      var reqFunction;

      beforeEach('Create guest agent', function () {
        guestAgent = supertest.agent(app);
      });

      beforeEach('Create request function', function () {
        reqFunction = function() {
          guestAgent.get('/api/users/1')
          .then(function(thing){
            console.log('should not reach here!');
          })
          .catch(function() {
            throw Error;
          });
        }
      })

      it('should fail', function (done) {

          expect(reqFunction).to.throw(Error);
          done();
      });

    });

    describe('Authenticated request', function () {

      var loggedInAgent;

      var userInfo = {
        email: 'joe@gmail.com',
        password: 'shoopdawoop'
      };

      beforeEach('Create a user', function (done) {
        return User.create(userInfo).then(function (user) {
                  done();
              }).catch(done);
      });

      beforeEach('Create loggedIn user agent and authenticate', function (done) {
        loggedInAgent = supertest.agent(app);
        loggedInAgent.post('/login').send(userInfo).end(done);
      });

      it('should get with 200 response and with the user in the body', function (done) {
        loggedInAgent.get('/api/users/1').expect(200).end(function (err, response) {
          if (err) return done(err);
          expect(response.body.email).to.equal(userInfo.email);
          done();
        });
      });

    });

  });
});
