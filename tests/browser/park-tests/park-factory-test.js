describe('Park Factory', function () {

    beforeEach(module('parkTests'));
    var ParkFactory;

    var $httpBackend;
    beforeEach(inject(function (_$rootScope_, _ParkFactory_) {
      $rootScope = _$rootScope_;
      ParkFactory = _ParkFactory_;
    }));

    it('should be an object', function () {
      expect(ParkFactory).to.be.an('object');
    });


    describe('Find all method', function () {

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should make a request to GET /api/parks', function (done) {

        $httpBackend.expectGET('/api/parks');
        //$httpBackend.whenGET('/api/parks').respond({user: {}});
        $httpBackend.flush();

      });

    });
/*
    describe('destroy method', function () {

        it('should set user and id to null', function () {

            Session.user = {};
            Session.id = 1;

            Session.destroy();

            expect(Session.user).to.be.equal(null);
            expect(Session.id).to.be.equal(null);

        });

    });*/


});
