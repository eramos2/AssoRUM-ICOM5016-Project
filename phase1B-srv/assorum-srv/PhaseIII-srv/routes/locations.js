var express = require('express');
var router = express.Router();

var db = require('../queries/locations-queries');


router.get('/', db.getLocations);
router.get('/:loc_id', db.getSingleLocation);


module.exports = router;
