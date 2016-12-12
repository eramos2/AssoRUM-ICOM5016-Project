var express = require('express');
var router = express.Router();

var db = require('../queries/memberships-queries');


router.get('/memberships', db.getMemberships);
router.get('/memberships/:mbspid', db.getSingleMembership);

module.exports = router;
