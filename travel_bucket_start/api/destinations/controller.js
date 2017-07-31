// here are the functions we need to manage the destinations in our database

// first, we need to import the destination schema from the model file
var Destination = require('./model.js');

// this function finds all the destinations
// and then sends them back to whatever sent the request
// which is our React App component
exports.index = function(req,res){
	Destination.find()
	.then((destinations) => res.send(destinations));
};

// this function removes the destination with the specific id
// we passed it (in our React App component)
// then sends a message of "okay" when it's done
exports.destroy = function(req, res){
	Destination.remove({ _id: req.params.id })
	.then(() => res.send("Okay"));
};

// this function creates a new destination instance
// adds the destination info to it, saves it
// and then sends it back to the requester (our React App component)
exports.create = function(req, res) {
  var destination = new Destination();
  destination.destinationName = req.body.destinationName;
  destination.destinationImageUrl = req.body.destinationImageUrl;
  destination.destinationLat = req.body.destinationLat;
  destination.destinationLong = req.body.destinationLong;
  destination.save()
  .then(destination => res.send(destination));
};
