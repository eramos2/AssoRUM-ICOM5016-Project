var express = require('express');
var router = express.Router();

var db = require('../queries/associations-queries');



router.get('/', db.getAllAssociations);
router.get('/:assoid', db.getSingleAssociation);
router.get('/search/:keyword', db.searchAssociations);
router.get('/:assoid/events', db.getAssociationEvents);
router.get('/:assoid/memberships', db.getAssociationMemberships);


module.exports = router;
