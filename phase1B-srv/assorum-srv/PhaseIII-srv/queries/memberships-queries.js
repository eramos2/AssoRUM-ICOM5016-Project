var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
var db = pgp(connectionString);

function getMemberships(req, res, next){
  db.any('select * from membership')
  .then(function (data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL memberships'
    });
  })
  .catch(function (err){
    return next(err);
  });
}

function getSingleMembership(req, res, next){
  var mbspid = parseInt(req.params.mbspid);
  db.any('select * from membership where mbspid = $1', mbspid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE membership'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}


module.exports = {
  getMemberships: getMemberships,
  getSingleMembership: getSingleMembership
};
