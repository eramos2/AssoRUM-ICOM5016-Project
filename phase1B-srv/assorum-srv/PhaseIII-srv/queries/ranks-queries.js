var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
var db = pgp(connectionString);

function getRanks(req, res, next){
  db.any('select * from rank')
  .then(function (data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL ranks'
    });
  })
  .catch(function (err){
    return next(err);
  });
}

function getSingleRank(req, res, next){
  var rankid = parseInt(req.params.rankid);
  db.any('select * from rank where rankid = $1', rankid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE rank'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

module.exports = {
  getRanks: getRanks,
  getSingleRank: getSingleRank

};
