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
var Promise = require('sequelize').Promise;

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

    var parks = [
        {
            name: 'Wicker Park',
            location: '1425 North Damen, Chicago, IL 60622',
            description: 'Located in the West Town Community Area, Wicker Park totals 4.03 acres and features a field house with gymnasium and meeting rooms. Outside the park offers a large children’s playground with interactive water spray feature, a community garden area, ornamental fountain, dog friendly area and baseball field and basketball courts and an athletic field for soccer or football.\nMany of these spaces are available for rental. Park-goers can play seasonal sports and table games at the facility. After school programs are offered throughout the school year, and in the summer youth attend the Park District’s popular six-week day camp.\nIn addition to programs, Wicker Park hosts fun special events throughout the year for the whole family, such as indoor movies in the park and holiday events.\nThough small in size, Wicker Park is especially well known for its lush and well-tended gardens.  These ornamental gardens, which comprise 10,000 square feet of space, were designed, funded, and are maintained by volunteers affiliated with the Wicker Park Garden Club.  The club works in close collaboration with the Chicago Park District through the Community Gardens in the Parks program.  Various sections of the gardens are designated in memory of individuals who worked to develop the gardens in the park: William Westfall, Marion Smith, Casey Wismont, Conrad Cwiertnia, and Allen Blaurock.  All interested gardeners are invited to attend weekly garden tending days where they will learn how to design and maintain gardens for their homes.',
            email: 'park@park.park',
            phone: '(312) 742-7553'
        },
        {
            name: 'Welles Park',
            location: '2333 W. Sunnyside, Chicago, IL 60625',
            description: 'Located in the heart of Lincoln Square at Lincoln and Montrose Avenues sits the 15-acre Welles Park, a gathering place for musicians and sports and fitness enthusiasts of all kinds. Many residents enjoy the park’s indoor pool—using it year-round for lap swims, instruction, and aqua exercise. Others visit Welles Park’s fitness center for a workout, while some prefer a leisurely game of horseshoes at the park’s outdoor pits.\nThe Chicago Park District installed and unveiled a green, wrought-iron, European-style gazebo on the west side of the park as a centerpiece for the Lincoln Square community. Equipped with electricity for lights and sound, the gazebo is used for outdoor concerts, storytelling and other performances.\nIn Spring 2010 the park district unveiled a new action packed ADA accessible/softsurface playground for community children. On the many fields at Welles Park, one can find baseball, softball, track and field, and football. Preschoolers get involved in tot soccer, floor hockey, tumbling and various play groups, while older children can participate in tumbling, arts & crafts, swimming and many sports. Welles Park also provides activities for adults and children who are developmentally disabled through its therapeutic recreation programs.',
            email: 'park@park.park',
            phone: '(312) 742-7511'
        }
    ];

    var facilities = [
        {
            name: 'Wicker Softball',
            description: 'A softball field at Wicker Park.'
        },
        {
            name: 'Basketball Court - Outdoor',
            description: 'A basketball court at Wicker Park.'
        },
        {
            name: 'Welles Park Pool',
            description: 'A place to swim at Welles Park'
        }
    ];


    // This implementation might give an issue in the future since facilities depend on a park existing in
    // the database first and these are async functions.... just a guess.
    // for now it works :)
    var createWickerPark =
        Promise.all([Park.create(parks[0]), Facility.create(facilities[0]), Facility.create(facilities[1])])
        .spread(function(park, facil0, facil1) {
            return Promise.all([park.addFacility(facil0), park.addFacility(facil1)]);
        });

    var createWellesPark =
        Promise.all([Park.create(parks[1]), Facility.create(facilities[2])])
        .spread(function(park, facil) {
            return park.addFacility(facil);
        });

    return Promise.all([createWickerPark, createWellesPark]);
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
var createSlots = function(startTime, endTime, duration, price, date, facilityId) {
    var slotArray = [];
    //var startTime = 900;
    //var endTime = 1800;
    for(var i=startTime; i<endTime; i+=duration)
    {
        slotArray.push({
            startTime: i,
            endTime: i+100,
            price: 50.00,
            date: date,
            facilityId: facilityId
        })
    }

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
        slots = slots.concat(createSlots(900, 1800, 100, 50.00, '2016-09-16', i));
        slots = slots.concat(createSlots(900, 1800, 100, 50.00, '2016-09-17', i));
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
                   {
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
           },
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
                    return slot.update({cartId: 1});
                }))
            })

}




db.sync({force: true})
    .then(function () {
        return Promise.all([seedUsers(), seedParksAndFacilities(), seedSlots()]);
    })
    .then(function() {
        return seedCarts();
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
