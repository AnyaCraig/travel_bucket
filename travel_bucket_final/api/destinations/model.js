// we need mongoose to talk to MongoDB
var mongoose = require('mongoose');

// we create a new schema
var DestinationSchema = new mongoose.Schema({
	destinationName: String,
	destinationImageUrl: String,
	destinationLat: String,
	destinationLong: String,
});

// we instantiate our schema
var Destination = mongoose.model('Destination', DestinationSchema);

// we export the Destination schema
module.exports = Destination;
