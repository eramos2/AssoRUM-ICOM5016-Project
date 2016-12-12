var express = require('express');
var router = express.Router();

var db = require('../queries/events-queries');


router.get('/events', db.getAllEvents);
router.get('/events/:eid', db.getSingleEvent);
router.get('/events/:eid/tags', db.getEventTags);
router.get('/events/search/:keyword', db.searchEvents);
router.post('/events', db.createEvent);
router.put('/events/:eid', db.updateEvent);
router.delete('/events/:eid', db.removeEvent);

module.exports = router;
