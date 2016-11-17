var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/events', db.getAllEvents);
router.get('/api/events/:id', db.getSingleEvent);
router.post('/api/events', db.createEvent);
router.put('/api/events/:id', db.updateEvent);
router.delete('/api/events/:id', db.removeEvent);
router.get('/api/clients', db.getAllClients);
router.get('/api/clients/:username', db.getSingleClient);
router.get('/api/associations', db.getAllAssociations);
//router.get('/api/associations/:name', db.getSingleAssociation);


module.exports = router;
