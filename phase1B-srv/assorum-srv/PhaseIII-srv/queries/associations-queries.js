var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
var db = pgp(connectionString);

// Association queries
function getAllAssociations(req, res, next) {
  db.any('select * from association natural inner join department')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL associations'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
// returns asso info and client that manages it
function getSingleAssociation(req, res, next){
  var assoid = parseInt(req.params.assoid);
  db.any('select * from association natural inner join department,client where association.assoid = $1 and client.cid = association.adminid ', assoid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All memberships of Association'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

function getAssociationEvents(req, res, next){
  var assoid = parseInt(req.params.assoid);
  db.any('select eid,event_name,event_desc,eimage,eventdata from association natural inner join event where association.assoid = $1', assoid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All events of Association'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

// Finds associations with asso_name or assodescmatching given keyword
function searchAssociations(req, res, next) {
  var keyword = req.params.keyword.split("-");
  var searchString = "";
  for(var i=0;i<keyword.length;i++){
    if(i == 0){
      searchString = keyword[i];
    }
    else {
      searchString += " " + keyword[i];
    }
  }
  db.any('select * from association natural inner join department,client where (association.asso_name ILIKE $1 OR association.assodesc ILIKE $1) and client.cid = association.adminid', ['%' + searchString + '%'])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL matched events'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAssociationMemberships(req, res, next){
  var assoid = parseInt(req.params.assoid);
  db.any('select mbspid,typeofmembership,price from membership where assoid = $1', assoid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All memberships of Association'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

module.exports = {
  getAllAssociations: getAllAssociations,
  getSingleAssociation: getSingleAssociation,
  searchAssociations: searchAssociations,
  getAssociationEvents: getAssociationEvents,
  getAssociationMemberships: getAssociationMemberships
};
