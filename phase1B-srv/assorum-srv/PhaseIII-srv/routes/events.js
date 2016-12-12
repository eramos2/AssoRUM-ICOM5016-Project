var express = require('express');
var router = express.Router();

var db = require('../queries/events-queries');


router.get('/', db.getAllEvents);
router.get('/:eid', db.getSingleEvent);
router.get('/:eid/tags', db.getEventTags);
router.get('/search/:keyword', db.searchEvents);
router.post('/', db.createEvent);
router.put('/:eid', db.updateEvent);
router.delete('/:eid', db.removeEvent);

module.exports = router;
