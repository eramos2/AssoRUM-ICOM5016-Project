var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://emmanuelramos:emaema.@localhost:5432/assorum';
//var connectionString = 'postgres://umvqzgtzegopge:Mk7KHzN4igK5H1Ub8IEAbTFugo@ec2-54-243-207-17.compute-1.amazonaws.com:5432/d2t0un16n28uoo';
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
  db.one('select * from event where eid = $1', eID)
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

function createEvent(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into event(name, description, location, date, association, img)' +
      'values(${name}, ${description}, ${location}, ${date}, ${association}, ${img})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
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
// Association queries
function getAllAssociations(req, res, next) {
  db.any('select * from (association natural inner join administrator) natural inner join department')
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
  db.any('select * from (association natural inner join manages) natural inner join department,client where association.assoid = $1 and client.cid = manages.cid', assoid)
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
//needs to be finished*****
function getClientFavorites(req, res, next){
  var cid = parseInt(req.params.cid);
  db.any('select * from belongsto natural inner join tag where belongsto.eid = $1', cid)
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
  getAllEvents: getAllEvents,
  getSingleEvent: getSingleEvent,
  createEvent: createEvent,
  updateEvent: updateEvent,
  removeEvent: removeEvent,
  getAllClients: getAllClients,
  getSingleClient: getSingleClient,
  getAllAssociations: getAllAssociations,
  getSingleAssociation: getSingleAssociation,
  getAssociationEvents: getAssociationEvents,
  getAssociationMemberships: getAssociationMemberships,
  getEventTags: getEventTags,
  getTags: getTags,
  getSingleTag: getSingleTag,
  getLocations: getLocations,
  getSingleLocation: getSingleLocation,
  getRanks: getRanks,
  getSingleRank: getSingleRank,
  getMemberships: getMemberships,
  getSingleMembership: getSingleMembership,
  getDepartments: getDepartments,
  getSingleDepartment: getSingleDepartment

};
