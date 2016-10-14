// Express is the web framework
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

var allowCrossDomain = function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

   // intercept OPTIONS method
   if ('OPTIONS'  == req.method) {
     res.send(200);
   }
   else {
     next();
   }
 };


app.use(allowCrossDomain);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//app.use(express.bodyParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

//to load files that are in the public directory
app.use(express.static('public'));





var event = require("./event.js");
var assoc = require("./assoc.js");

var Event = event.Event;
var Assoc = assoc.Assoc;

//name, description,img
var assocList = new Array(
    new Assoc("Hackertrons",
    "There are 10 kinds of people in the world: the ones who understand binary and the one who don't",
    ["./public/images/event/workshop_ionic_framework_small.jpeg","./public/images/event/workshop_ionic_framework_large.jpeg"]),
    new Assoc("GamerUPRM",
    "We are Gamerz YOLO !!!!",
    ["./public/images/event/workshop_ionic_framework_small.jpeg","./public/images/event/workshop_ionic_framework_large.jpeg"]),
    new Assoc("bebelatasUPRM",
    "C2H6O, nuestro pan de cada dia.",
    ["./public/images/event/workshop_ionic_framework_small.jpeg","./public/images/event/workshop_ionic_framework_large.jpeg"]),
    new Assoc("Chemtist",
    "We think there is color, we think there is sweet, we think there is bitter, but in reality there are atoms and a void.",
    ["./public/images/event/workshop_ionic_framework_small.jpeg","./public/images/event/workshop_ionic_framework_large.jpeg"]),
    new Assoc("Orquesta de Cuerdas UPRM",
    "Representando la cultura y tradicion musical del colegio",
    ["/images/event/workshop_ionic_framework_small.jpeg","./public/images/event/workshop_ionic_framework_large.jpeg"]),
    new Assoc("RumLit",
    "Lee porque el que no lee, no es bruce lee",
    ["./public/images/event/workshop_ionic_framework_small.jpeg","./public/images/event/workshop_ionic_framework_large.jpeg"])

);

var assocNextId = 0;


for (var i=0; i< assocList.length; ++i){
    assocList[i].id = assocNextId++;
}

//name, description,location,date,association,img
var eventList = new Array(
    new Event("Workshop Ionic Framework",
    "Ionic workshop for those interested in learning the basic and advanced techniques of ionic Framework. ",
    "Anfiteatro Celis",
    "28/10/2016",
    "Hackertrons",
    ["/images/event/workshop_ionic_framework_small.jpeg","/images/event/workshop_ionic_framework_large.jpeg"]),
    new Event("Reunion Gamers UPRM",
    "Be part of the first meeting of our association. Talk to game developers, test games made by UPRM students and test your skills in competitive first person shooter games against other UPRM students and even professors. ",
    "3er piso centro de estudiantes",
    "15/10/2016",
    "GamerUPRM",
    ["/images/event/reunion_games_uprm_small.jpeg","/images/event/reunion_games_uprm_large.jpeg"]),
    new Event("Pinta tu muro",
    "An event for showing your creativity and innovative skills to the UPRM community. Prices will be given to the most liked work of art. Be creative.",
    "Serpentinata",
    "1/11/2016",
    "ArtGeeksRUM",
    ["/images/event/pinta_tu_muro_small.jpeg","/images/event/pinta_tu_muro_large.jpeg"]),
    new Event("Meeting bebelatasUPRM",
    " Join us on november 27 and meet the bebelatas team. Our focus is to drink and get good grades. Be part of this amazing journey.",
    "Garabato",
    "27/11/2016",
    "bebelatasUPRM",
    ["/images/event/meeting_bebelatasuprm_small.jpeg","/images/event/meeting_bebelatasuprm_large.jpeg"]),
    new Event("Chemistry Showdown",
    "Join our annual Chemistry Showdown to test your knowledge in a fun way. Be sure to bring a team of 3 students and your periodic table. See you there. ",
    "Q-101",
    "19/10/2016",
    "Chemtist",
    ["/images/event/chemistry_showdown_small.jpeg","/images/event/chemistry_showdown_large.jpeg"]),
    new Event("Venta de libros",
    "Get started your reading or add to your collection of books by buying some used or new books in our event.",
    "Placita Chardon",
    "27/11/2016",
    "RumLit",
    ["/images/event/venta_de_libros_small.jpeg","/images/event/venta_de_libros_large.jpeg"]),
    new Event("Guerrilla 4v4",
    "Think you got basketball skills? Come to the annual basketball 4v4 games fundraiser for the UPRM basketball teams. ",
    "Gimnasio Rafael Espada",
    "4/12/2016",
    "BasketballTeam",
    ["/images/event/guerrilla_4v4_small.jpeg","/images/event/guerrilla_4v4_large.jpeg"]),
    new Event("Presencias Navidad Edition",
    "Come and join our christmas spirit. Truly a night to remember, with special guest surprises and a lot of Puerto Rican typical Christmas songs.",
    "Portico",
    "10/12/2016",
    "Banda de Cuerda UPRM",
    ["/images/event/presencias_navidad_edition_small.jpeg","/images/event/presencias_navidad_edition_large.jpeg"])
);

var eventNextId = 0;


for (var i=0; i< eventList.length; ++i){
    eventList[i].id = eventNextId++;
}

// REST Operations
// Idea: Data is created, read, updated, or deleted through a URL that
// Identifies the resource to be created, read, updated, or deleted.
// The URL and any other input data is sent over standard HTTP requests.
// Mapping of HTTP with requests
// a) POST - Created a new object. (Database create operation)
// b) GET - Read an individual object, collection of object, or simple valuse(Database read Operation)
// c) PUT - Update an individual object, or collection (Database update operation)
// d) DELETE - Remove an individual object, or collection

// REST Operation - HTTP GET to read all events
app.get('/associations', function(req, res) {
  console.log("GET");
  var response = {"associations" : assocList};
  res.json(response);
});

// REST Operation - HTTP GET to read a event based on its id
app.get('/associations/:id', function(req, res){
  var id = req.params.id;
      console.log("GET association: " + id);

      if((id<0) || (id >= assocNextId)) {
        // not found
        res.statusCode = 404;
        res.send("Association not found.");
      } else {
        var target = -1;
        for(var i=0; i<assocList.length; i++){
          if(assocList[i].id == id){
              target = i;
              break;
          }
        }
        if (target == -1){
          res.statusCode = 404;
          res.send("Association not fount.");
        } else{
          var response = {"association" : assocList[target]};
          res.json(response);
        }
      }
});


// REST Operation - HTTP PUT to updated a car based on its id
app.put('/associations/:id', function(req, res){
  var id = req.params.id;
        console.log("PUT Association: " + id);

  if((id < 0) || (id >= assocNextId)){
    //not found
    res.statusCode = 404;
    res.send("Association not found.");
  } else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('description')){
               // important field(s) missing
               res.statusCode = 400;
               return res.send('Error: Missing fields for association.');
  } else {
     var target = -1;
     for (var i=0; i <assocList.length; i++){
       if(assocList[i].id == id){
         target = i;
         break;
       }
     }
     if(target == -1){
       res.statusCode = 404;
       res.send("Association not found.");
     } else {
       var theAssoc = assocList[target];
       theAssoc.name = req.body.name;
       theAssoc.description = req.body.description;
       var response = {"association" : theAssoc};
       res.json(response);
     }
   }
});

// REST Operation - HTTP DELETE to delete an event, based on its id
app.delete('/associations/:id', function(req, res) {
  var id = req.params.id;
    console.log("DELETE association: " + id);

  if((id < 0) || (id>= assocNextId)){
    // not found
    res.statusCode = 404;
    res.send("Association not found");
  } else {
    var target =-1;
    for(var i=0; i < assocList.length; i++){
      if(assocList[i].id == id){
        target = i;
        break;
      }
    }
    if(target == -1){
      res.statusCode = 404;
      res.send("Association not found.");
    } else {
      assocList.splice(target, 1);
      res.json(true);
    }
  }
});

// REST Operation - HTTP POST to add a new event
app.post('/associations', function(req, res){
  console.log("POST");

  if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('description')){
       res.statusCode = 400;
       return res.send('Error: Missing fields for association.');
  }

  var newAssoc = new Assoc(req.body.name, req.body.description, req.body.img);

  newAssoc.id = assocNextId++;
  console.log("New Association: " + JSON.stringify(newAssoc));
  assocList.push(newAssoc);
  res.json(true);
})




// REST Operation - HTTP GET to read all events
app.get('/events', function(req, res) {
  console.log("GET");
  var response = {"events" : eventList};
  res.json(response);
});

// REST Operation - HTTP GET to read a event based on its id
app.get('/events/:id', function(req, res){
  var id = req.params.id;
      console.log("GET event: " + id);

      if((id<0) || (id >= eventNextId)) {
        // not found
        res.statusCode = 404;
        res.send("Event not found.");
      } else {
        var target = -1;
        for(var i=0; i<eventList.length; i++){
          if(eventList[i].id == id){
              target = i;
              break;
          }
        }
        if (target == -1){
          res.statusCode = 404;
          res.send("Event not fount.");
        } else{
          var response = {"event" : eventList[target]};
          res.json(response);
        }
      }
});


// REST Operation - HTTP PUT to updated a car based on its id
app.put('/events/:id', function(req, res){
  var id = req.params.id;
        console.log("PUT event: " + id);

  if((id < 0) || (id >= eventNextId)){
    //not found
    res.statusCode = 404;
    res.send("Event not found.");
  } else if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('description') ||
            !req.body.hasOwnProperty('location') || !req.body.hasOwnProperty('date') ||
             !req.body.hasOwnProperty('association')){
               // important field(s) missing
               res.statusCode = 400;
               return res.send('Error: Missing fields for event.');
  } else {
     var target = -1;
     for (var i=0; i <eventList.length; i++){
       if(eventList[i].id == id){
         target = i;
         break;
       }
     }
     if(target == -1){
       res.statusCode = 404;
       res.send("Event not found.");
     } else {
       var theEvent = eventList[target];
       theEvent.name = req.body.name;
       theEvent.description = req.body.description;
       theEvent.location = req.body.location;
       theEvent.date = req.body.date;
       theEvent.association = req.body.association;
       var response = {"event" : theEvent};
       res.json(response);
     }
   }
});

// REST Operation - HTTP DELETE to delete an event, based on its id
app.delete('/events/:id', function(req, res) {
  var id = req.params.id;
    console.log("DELETE event: " + id);

  if((id < 0) || (id>= eventNextId)){
    // not found
    res.statusCode = 404;
    res.send("Event not found");
  } else {
    var target =-1;
    for(var i=0; i < eventList.length; i++){
      if(eventList[i].id == id){
        target = i;
        break;
      }
    }
    if(target == -1){
      res.statusCode = 404;
      res.send("Event not found.");
    } else {
      eventList.splice(target, 1);
      res.json(true);
    }
  }
});

// REST Operation - HTTP POST to add a new event
app.post('/events', function(req, res){
  console.log("POST");

  if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('description') ||
     !req.body.hasOwnProperty('location') || !req.body.hasOwnProperty('date') ||
     !req.body.hasOwnProperty('association')){
       res.statusCode = 400;
       return res.send('Error: Missing fields for event.');
  }

  var newEvent = new Event(req.body.name, req.body.description, req.body.location, req.body.date, req.body.association, req.body.img);

  newEvent.id = eventNextId++;
  console.log("New Event: " + JSON.stringify(newEvent));
  eventList.push(newEvent);
  res.json(true);
})
/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

app.listen(process.env.PORT, '0.0.0.0');
console.log("server listening");
