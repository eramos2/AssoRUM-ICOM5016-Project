var express = require('express');
var router = express.Router();

var db = require('../queries/tags-queries');


router.get('/tags', db.getTags);
router.get('/tags/:tid', db.getSingleTag);


module.exports = router;
