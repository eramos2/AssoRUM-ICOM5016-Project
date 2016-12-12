var express = require('express');
var router = express.Router();

var db = require('../queries/ranks-queries');

router.get('/ranks', db.getRanks);
router.get('/ranks/:rankid', db.getSingleRank);


module.exports = router;
