var express = require('express');
var router = express.Router();

var db = require('../queries/memberships-queries');


router.get('/', db.getMemberships);
router.get('/:mbspid', db.getSingleMembership);

module.exports = router;
