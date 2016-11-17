var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/events', db.getAllEvents);
router.get('/api/events/:id', db.getSingleEvent);
router.post('/api/events', db.createEvent);
router.put('/api/events/:id', db.updateEvent);
router.delete('/api/events/:id', db.removeEvent);


module.exports = router;
