var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/events', db.getAllEvents);
router.get('/api/events/:eid', db.getSingleEvent);
router.get('/api/events/:eid/tags', db.getEventTags);
router.get('/api/events/search/:keyword', db.searchEvents);
router.post('/api/events', db.createEvent);
router.put('/api/events/:eid', db.updateEvent);
router.delete('/api/events/:eid', db.removeEvent);
router.get('/api/clients', db.getAllClients);
router.get('/api/clients/:username', db.getSingleClient);
router.get('/api/associations', db.getAllAssociations);
router.get('/api/associations/:assoid', db.getSingleAssociation);
router.get('/api/associations/search/:keyword', db.searchAssociations);
router.get('/api/associations/:assoid/events', db.getAssociationEvents);
router.get('/api/associations/:assoid/memberships', db.getAssociationMemberships);
router.get('/api/tags', db.getTags);
router.get('/api/tags/:tid', db.getSingleTag);
router.get('/api/locations', db.getLocations);
router.get('/api/locations/:loc_id', db.getSingleLocation);
router.get('/api/ranks', db.getRanks);
router.get('/api/ranks/:rankid', db.getSingleRank);
router.get('/api/memberships', db.getMemberships);
router.get('/api/memberships/:mbspid', db.getSingleMembership);
router.get('/api/departments', db.getDepartments);
router.get('/api/departments/:depid', db.getSingleDepartment);

module.exports = router;
