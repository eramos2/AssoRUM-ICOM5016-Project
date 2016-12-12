var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
var db = pgp(connectionString);

function getTags(req, res, next){
  db.any('select * from tag')
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All tags'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

function getSingleTag(req, res, next){
  var tid = parseInt(req.params.tid);
  db.any('select * from tag where tid = $1', tid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE tag'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}


module.exports = {
  getTags: getTags,
  getSingleTag: getSingleTag
};
