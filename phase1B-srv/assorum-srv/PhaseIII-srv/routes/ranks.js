var express = require('express');
var router = express.Router();

var db = require('../queries/ranks-queries');

router.get('/', db.getRanks);
router.get('/:rankid', db.getSingleRank);


module.exports = router;
