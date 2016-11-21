var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/events', db.getAllEvents);
router.get('/api/events/:eid', db.getSingleEvent);
router.get('/api/events/:eid/tags', db.getEventTags);
router.post('/api/events', db.createEvent);
router.put('/api/events/:eid', db.updateEvent);
router.delete('/api/events/:eid', db.removeEvent);
router.get('/api/clients', db.getAllClients);
router.get('/api/clients/:username', db.getSingleClient);
router.get('/api/associations', db.getAllAssociations);
router.get('/api/associations/:assoid', db.getSingleAssociation);
router.get('/api/associations/:assoid/events', db.getAssociationEvents);



module.exports = router;
