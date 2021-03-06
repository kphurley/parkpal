/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Facility = db.model('facility');
var Park = db.model('park');
var Slot = db.model('slot');
var Cart = db.model('cart');
var Review = db.model('review');
var Transaction = db.model('transaction');
var Promise = require('sequelize').Promise;
var parkData = require('./seed.helper').parkData;
var facilityData = require('./seed.helper').facilityData;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            firstName: 'John',
            lastName: 'Doe'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            firstName: 'Barack',
            lastName: 'Obama',
            isAdmin: true
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedParksAndFacilities = function() {

    var parks = [];//add to this array for more images

    var images = ['http://www.chicagoparkdistrict.com/assets/1/7/SlideShowDimensionMain/2af6cafa9da54750bc8d37613207c7141.JPG',
                'http://www.chicagoparkdistrict.com/assets/1/7/SlideShowDimensionMain/c5e08f1f1a394bbd9b73269ddc25aaef1.jpg'];

    //get a random image from the image list
    var randomImage = function(){
        return images[Math.floor(Math.random()*images.length)];
    }

    parkData.forEach(function(park) {
       parks.push({
            id: Math.floor(+park['PARK NUMBER']),
            name: park.LABEL,
            address: park['STREET ADDRESS'],
            city: 'Chicago',
            state: 'IL',
            zip: park.ZIP,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dui neque, tincidunt nec pretium suscipit, volutpat a tortor. Donec porta consequat dui, ut rhoncus leo viverra nec. Nullam sollicitudin scelerisque lobortis. Etiam in viverra nunc, quis hendrerit ante. Quisque leo ligula, bibendum non accumsan non, finibus non est. Nulla risus ipsum, commodo eget venenatis quis, rutrum sit amet massa. Sed massa turpis, vulputate ut egestas ut, elementum eget enim. Nulla lacus velit, condimentum vel vulputate eu, aliquam ac erat. Nulla orci odio, consequat non sagittis at, ultricies et nisi. Praesent tempus maximus enim, id dapibus eros maximus quis. Proin vitae mi sit amet risus rutrum vestibulum viverra vel est. Nunc elementum, dui ac scelerisque rutrum, augue lectus fermentum ligula, ut condimentum enim nunc non neque. Duis ut sem id enim viverra tincidunt. Nulla aliquam eleifend ornare. Proin non arcu nec enim euismod condimentum id sed odio.\nVivamus tempus, nisl eget malesuada dictum, ligula nunc accumsan est, finibus commodo quam turpis et augue. Suspendisse sed nibh dui. Ut lorem metus, commodo eget commodo non, scelerisque non ante. Aliquam placerat suscipit nulla, nec venenatis eros ultrices ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis convallis orci id tortor auctor dignissim. Nunc aliquet justo elit.',
            email: 'park@park.park',
            phone: '(312) 742-7511',
            imageUrl: randomImage()
       })
    });

    var facilities = [];

    var prettify = function(str) {
        return str.split(' ').map(s => s.toLowerCase())
        .map(s => (s.substr(0,1).toUpperCase()+s.substr(1)))
        .join(' ');
    }

    facilityData.forEach(function(facility) {
        facilities.push({
           name: prettify(facility['FACILITY_T'] + ' ' + facility['FACILITY_N']) + ' #' + facility['OBJECTID'],
           description: 'Praesent augue tortor, blandit sed bibendum eget, ultrices tempus erat. Suspendisse a iaculis augue, rutrum porttitor diam. Vivamus feugiat non mi eu sagittis. Nulla felis sem, varius ut neque et, maximus porttitor justo. Fusce odio nunc, ultrices sed arcu non, malesuada lobortis mauris. Suspendisse potenti.',
           parkId: Math.floor(+facility['PARK_NO'])
        });
    });

    /*var reviews = [
        {
            title: 'This field is so dirty',
            rating: 1,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            userId: 1,
            facilityId: 214

        },
        {
            title: 'I hit a home run!',
            rating: 5,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            userId: 1,
            facilityId: 214
        }

    ]*/

    var createParks = Promise.all(parks.map(park => Park.create(park)));
    var createFacilities = Promise.all(facilities.map(facility => Facility.create(facility)));
    //var createReviews = Promise.all(reviews.map(review => Review.create(review)));

    return Promise.all([createParks, createFacilities]);
}

/**
 * createSlots - creates a set of slots for a facilityId
 * @param  {number - integer} startTime - the start time for this set of slots
 * @param  {number - integer} endTime - the end time for the set
 * @param  {number - integer} duration - the duration of each slot
 * @param  {number - float} price - the price for each slot
 * @param  {string} date - the date in the form 'MM-DD-YYYY'
 * @param  {number - integer} - the id of the facility to add slots to
 * @return {Array of Objects} - an array of Slot objects
 */
var createSlots = function(facilityId) {
    var slotArray = [];
    //var startTime = 900;
    //var endTime = 1800;
    var startDate = Date.now();
    for(var i=0; i<24; i++)
    {
        var endDate = startDate + 60*60*1000;

        slotArray.push({
            startTime: startDate,
            endTime: endDate,
            price: 50.00,
            facilityId: facilityId
        })

        startDate = endDate;
    }


    slotArray.push({
            startTime: new Date('Tue Sep 27 2016 00:00:00 GMT-0500 (CDT)'),
            endTime: new Date('Tue Sep 27 2016 00:00:00 GMT-0500 (CDT)') + 360000,
            price: 50.00,
            facilityId: facilityId
        })

    /*slotArray.push({
        startTime: 1800,
        endTime: 1900,
        price: 50.00,
        date: '09-16-2016',
        facilityId: 1,
        booked: true
    })*/
    // create a cart id for some slots slotArray[0].

    return slotArray;
}

var seedSlots = function () {

    var slots = [];

    for(var i=1; i<4; i++) {
        slots = slots.concat(createSlots(i));
        slots = slots.concat(createSlots(i));
    }

    console.log('SLOTS', slots);

    var creatingSlots = slots.map(function (slotObj) {
        return Slot.create(slotObj);
    });

    return Promise.all(creatingSlots);
}

var createCarts = function () {
    var newDateObj = new Date(new Date().getTime() + 10*60000);
    console.log(newDateObj);

  return [{
            userId: 1,
            expires: newDateObj
           },
           /*        {
            userId: 1,
            expires: newDateObj
           },
                   {
            userId: 1,
            expires: newDateObj
           },
                   {
            userId: 2,
            expires: newDateObj
           },
                   {
            userId: 2,
            expires: newDateObj
           },*/
                   {
            userId: 2,
            expires: newDateObj
           }];


}

var seedCarts = function() {

    var carts = createCarts();

    var creatingCarts = carts.map(function (cartObj) {
        return Cart.create(cartObj);
    });

    return Promise.all(creatingCarts);
}

var updateSlots = function() {
    return Slot.findAll( { where: {
                        id: { $between: [4,7] }
                     }
                    })
            .then(function(slots) {
                // console.log(chalk.red("Slots"), slots);
                return Promise.all(slots.map(function(slot) {
                    return slot.update(
                        {cartId: 1,
                        booked: true,
                        transactionId: Math.floor(Math.random()*2 + 1)}); // adding slots to transactions
                }));
            });
};

var createTransactions = function() {

    return [ {
            totalAmountPaid: 500,
            userId: 1
        }, {
            totalAmountPaid: 800,
            userId: 1
        }, {
            totalAmountPaid: 900,
            userId: 2
        }, {
            totalAmountPaid: 1500,
            userId: 2
        }]

}

var seedTransactions = function() {
    var transactions = createTransactions();
    var creatingTransactions = transactions.map(function(transactionObj) {
        return Transaction.create(transactionObj);
    })

    return Promise.all(creatingTransactions);
}




db.sync({force: true})
    .then(function () {
        return Promise.all([seedUsers(), seedParksAndFacilities()]);
    })
    .then(function() {
        return seedSlots();
    })
    .then(function() {
        return seedCarts();
    })
    .then(function() {
        return seedTransactions();
    })
    .then(function() {
        return updateSlots();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
