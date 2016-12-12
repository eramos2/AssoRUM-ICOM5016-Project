var express = require('express');
var router = express.Router();

var db = require('../queries/departments-queries');



router.get('/', db.getDepartments);
router.get('/:depid', db.getSingleDepartment);

module.exports = router;
