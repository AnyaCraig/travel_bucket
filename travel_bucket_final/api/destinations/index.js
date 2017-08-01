// this is the file that will be looked at 
// when our react component calls '/api/destinations'

// first, we need express
var express = require('express');

// then, we need the express router
var router = new express.Router();

// then, we need our controller file
var controller = require('./controller.js');

// if the requested URL is /api/destinations/
// with a method of GET,
// call the index function from the controller
router.get('/', controller.index);

// if the requested url is /api/destinations/{a specific id}/
// with a method of DELETE,
// call the destroy function from the controller
router.delete('/:id', controller.destroy);

// if the requested url is /api/destinations/
// with a method of POST,
// call the create function from the controller
router.post('/', controller.create);

// we just added stuff to the router object,
// so now we can export and use it
module.exports = router;
