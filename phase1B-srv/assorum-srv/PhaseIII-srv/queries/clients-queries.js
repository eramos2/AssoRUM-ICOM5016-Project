var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
var db = pgp(connectionString);


// User queries
function getAllClients(req, res, next) {
  db.any('select * from (client natural inner join rank)')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL clients'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//returns cid, clientname, username, password, rankid, image,c_email
function getSingleClient(req, res, next) {
  var username = req.params.username;
  db.one('select * from client where username =$1', username)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE client'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//returns eid, favid, cid, loc_id, event_name, event_desc, eimage, evendata(time),assoid
function getClientFavorites(req, res, next){
  var cid = parseInt(req.params.cid);
  db.any('select * from favorited natural inner join event where favorited.cid = $1;', cid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All favorites of client'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}


function addFavorite(req, res, next) {
  req.body.eid = parseInt(req.body.eid);
  req.body.cid = parseInt(req.body.cid);
  db.none('insert into favorited(eid,cid)' +
      'values(${eid},${cid})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one favorite event to client'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeFavorite(req, res, next) {
  var fav_id = parseInt(req.params.id);
  db.result('delete from favorited where fav_id = $1', fav_id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} from client favorites`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllClients: getAllClients,
  getSingleClient: getSingleClient,
  getClientFavorites: getClientFavorites,
  addFavorite: addFavorite,
  removeFavorite: removeFavorite
};
