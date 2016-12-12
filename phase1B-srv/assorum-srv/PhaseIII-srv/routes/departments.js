var express = require('express');
var router = express.Router();

var db = require('../queries/departments-queries');



router.get('/departments', db.getDepartments);
router.get('/departments/:depid', db.getSingleDepartment);

module.exports = router;
