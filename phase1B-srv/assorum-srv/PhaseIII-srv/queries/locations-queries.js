var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
var db = pgp(connectionString);

function getLocations(req, res, next){
  db.any('select * from location')
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All locations'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

function getSingleLocation(req, res, next){
  var loc_id = parseInt(req.params.loc_id);
  db.any('select * from location where loc_id = $1', loc_id)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE location'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

module.exports = {
  getLocations: getLocations,
  getSingleLocation: getSingleLocation
};
