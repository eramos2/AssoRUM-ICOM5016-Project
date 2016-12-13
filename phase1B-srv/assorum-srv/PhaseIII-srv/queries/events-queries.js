var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
var db = pgp(connectionString);

// add query functions
function getAllEvents(req, res, next) {
  db.any('select * from (event natural inner join location) natural inner join association')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL events'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleEvent(req, res, next) {
  var eID = parseInt(req.params.eid);
  db.one('select * from (event natural inner join location) natural inner join association where eid = $1', eID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE event'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
// Finds event with name or description matching given keyword
function searchEvents(req, res, next) {
  console.log(req.params.keyword);
  var keyword = req.params.keyword.split("-");
  console.log(keyword);
  var searchString = "";
  for(var i=0;i<keyword.length;i++){
    if(i == 0){
      searchString = keyword[i];
    }
    else {
      searchString += " " + keyword[i];
    }
  }
  console.log(searchString);
  db.any('select * from (event natural inner join location) natural inner join association where event_name ILIKE $1 OR event_desc ILIKE $1', ['%' + searchString + '%'])
    .then(function (data) {
      console.log(data);
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

function createEvent(req, res, next) {
  req.body.loc_id = parseInt(req.body.loc_id);
  req.body.assoid = parseInt(req.body.assoid);
  db.any('insert into event(event_name, event_desc, loc_id, eventdata, assoid)' +
      'values(${event_name}, ${event_desc}, ${loc_id}, ${eventdata}, ${assoid}) returning eid', req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Inserted one event'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateEvent(req, res, next) {
  db.none('update events set name=$1, description=$2, location=$3, date=$4, association=$5, img=$6 where id=$7',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated event'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEvent(req, res, next) {
  var eventID = parseInt(req.params.id);
  db.result('delete from events where id = $1', eventID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} event`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

//returns tag id, event id, belongsto id, tag description
function getEventTags(req, res, next){
  var eid = parseInt(req.params.eid);
  db.any('select * from belongsto natural inner join tag where eid = $1', eid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All tags of event'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

module.exports = {
  getAllEvents: getAllEvents,
  getSingleEvent: getSingleEvent,
  searchEvents: searchEvents,
  createEvent: createEvent,
  updateEvent: updateEvent,
  removeEvent: removeEvent,
  getEventTags: getEventTags
};
