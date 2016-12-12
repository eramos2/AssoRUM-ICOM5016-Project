var express = require('express');
var router = express.Router();

var db = require('../queries/tags-queries');


router.get('/', db.getTags);
router.get('/:tid', db.getSingleTag);


module.exports = router;
