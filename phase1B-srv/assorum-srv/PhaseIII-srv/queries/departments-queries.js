var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
var db = pgp(connectionString);

function getDepartments(req, res, next){
  db.any('select * from department')
  .then(function (data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL departments'
    });
  })
  .catch(function (err){
    return next(err);
  });
}

function getSingleDepartment(req, res, next){
  var depid = parseInt(req.params.depid);
  db.any('select * from department where depid = $1', depid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE department'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

module.exports = {
  getDepartments: getDepartments,
  getSingleDepartment: getSingleDepartment

};
