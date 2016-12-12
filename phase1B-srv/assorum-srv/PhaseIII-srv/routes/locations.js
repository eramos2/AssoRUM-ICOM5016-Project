var express = require('express');
var router = express.Router();

var db = require('../queries/locations-queries');


router.get('/locations', db.getLocations);
router.get('/locations/:loc_id', db.getSingleLocation);


module.exports = router;
