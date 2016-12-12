var promise = require('bluebird');
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
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



function getClientMemberships(req, res, next){
  var cid = parseInt(req.params.cid);
  db.any('select * from hasmembership natural inner join membership natural inner join association where cid = $1;', cid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All memberships of client'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

function getPaymentMethod(req, res, next){
  var cid = parseInt(req.params.cid);
  db.any('select * from paymentmethod where cid = $1;', cid)
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved All paymentmethod of client'
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
  req.body.eid = parseInt(req.params.eid);
  req.body.cid = parseInt(req.params.cid);
  db.none('insert into favorited(eid,cid) ' +
      'values(${eid} , ${cid}) returning fav_id', req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Inserted one favorite event to client'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function addMembership(req, res, next) {
  req.body.mbspid = parseInt(req.params.mbspid);
  req.body.cid = parseInt(req.params.cid);
  db.any('insert into hasmembership(mbspid,cid) values (${mbspid},${cid}) returning hasmbspid', req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Inserted one membership event to client'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



function createClient(req, res, next) {

  req.body.rankid = parseInt(req.body.rankid);
  db.any('insert into client(clientname,username,password,rankid,c_email) ' +
      'values(${clientname},${username},${password},${rankid},${c_email}) returning cid', req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'created a client'
        });
    }).then(function(){
      var from_email = new helper.Email("no-reply@assorum.com");
      var to_email = new helper.Email(req.body.c_email);
      var subject = 'Assorum Account Confirmation';
      var content = new helper.Content('text/plain', 'Hello, +req.body.username+"! Welcome to Assorum! Enter this code to use the app --> 1234');
      var mail = new helper.Mail(from_email, subject, to_email, content);


      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response) {
        //if(error) {
        //console.log(error.message);
        //console.log(error.response.statusCode);
        //console.log(error.response.body);
        //console.log(error.response.headers);
      //} else {
        //console.log(response);

        //console.log(response.statusCode);
        //console.log(response.body);
        //console.log(response.headers);
        //}
      });
    //  var from_email = new helper.Email('no-reply@assorum.com');
    //  var to_email = new helper.Email(req.body.c_email);

      //sendgrid.send(email);
      //console.log("email was sent");
      /*from_email = new helper.Email("felix.gonzalez3@upr.edu")
      to_email = new helper.Email("felix.gonzalez3@upr.edu")
      subject = "Sending with SendGrid is Fun"
      content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
      mail = new helper.Mail(from_email, subject, to_email, content)


      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });

      sg.API(request, function(error, response) {
        console.log(response.statusCode)
        console.log(response.body)
        console.log(response.headers)
      });*/
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePaymentMethod(req, res, next) {
  req.body.cardnumber = parseInt(req.body.cardnumber);
  req.body.cid = parseInt(req.body.cardnumber);
  db.any('UPDATE paymentmethod SET (typeofcard,cardnumber,address) =' +
      ' (${typeofcard}, ${cardnumber}, ${address} ) where cid = ${cid};', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'updated paymentmethod of client'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function makePayment(req, res, next) {
  req.body.mbspid = parseInt(req.body.mbspid);
  req.body.paymethodid = parseInt(req.body.paymethodid);
  req.body.amountpaid = parseInt(req.body.amountpaid);
  db.any('insert into client(mbspid,paymethodid,paymentid,amountpaid)' +
      'values(${mbspid},${paymethodid},${paymentid},${amountpaid}) returning paymentid', req.body)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'created a client'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeFavorite(req, res, next) {
  req.body.eid = parseInt(req.params.eid);
  req.body.cid =parseInt(req.params.cid);
  db.result('delete from favorited where eid = ${eid} and cid =${cid}', req.body)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed favorited event`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteClient(req, res, next) {
  var cid = parseInt(req.params.cid);
  db.result('delete from client where cid = $1', cid)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed client`
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
  getClientMemberships:getClientMemberships,
  addFavorite: addFavorite,
  getPaymentMethod: getPaymentMethod,
  updatePaymentMethod: updatePaymentMethod,
  addMembership: addMembership,
  makePayment: makePayment,
  createClient: createClient,
  removeFavorite: removeFavorite,
  deleteClient: deleteClient
};
