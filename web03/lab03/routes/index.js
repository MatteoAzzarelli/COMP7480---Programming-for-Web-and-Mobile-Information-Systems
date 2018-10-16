var express = require('express');
var router = express.Router();

//local database
var Realm = require('realm');

let BookingSchema = {
  name: 'Booking',
  properties: {
    name: "string",
    email: "string",
    numTickets: { type: "int", default: 0 },
    gender: { type: "string", default: "nan" },
    team: "string",
    hero: { type: "string", default: "nan" },
    remarks: "string"
  }
};

var bookingRealm = new Realm({
  path: 'booking.realm',
  schema: [BookingSchema]
});

/* Display all Bookings */
router.get('/bookings', function (req, res) {

  let data = bookingRealm.objects('Booking');

  res.render('bookings', {bookings: data});

});



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Handle the Form */
router.post('/form', function (req, res) {

  var response = {
    header: req.headers,
    body: req.body
  };

  response.body.numTickets = Number(response.body.numTickets);

  bookingRealm.write(function () {
    bookingRealm.create('Booking', response.body);
  });

  res.json(response);
});

module.exports = router;
