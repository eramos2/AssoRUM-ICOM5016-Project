var express = require('express');
var router = express.Router();

var db = require('../queries/associations-queries');



router.get('/associations', db.getAllAssociations);
router.get('/associations/:assoid', db.getSingleAssociation);
router.get('/associations/search/:keyword', db.searchAssociations);
router.get('/associations/:assoid/events', db.getAssociationEvents);
router.get('/associations/:assoid/memberships', db.getAssociationMemberships);


module.exports = router;
