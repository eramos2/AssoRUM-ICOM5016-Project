angular.module('assorum.services', [])

// TODO : modificar para que reciba dummy data de node
.factory('User', function($http){
  // Some dummy data for testing

  var user = {
    firstname: 'Feliz',
    lastname:'Gonzalez',
    img: 'img/feloespejuelo.png',
    email:'feliz.gonzalez3@upr.edu',
    rank: 'Freshman',
    favorites: [],
    membership: [],
    newFavorites: 0
  };

  return{

    addToMemberships: function(association){
      user.memberships.unshift(association);
    },
    getMemberships: function(association){
      return user.memberships;
    },
    addToFavorites: function(event){
      user.favorites.unshift(event);
    },
    getFavorites: function(){
      return user.favorites;
    },
    removeFavorite: function(event) {
      user.favorites.splice(user.favorites.indexOf(event), 1);
    },
    getProfile: function(){
      return {
        ufirst: user.firstname,
        ulast: user.lastname,
        img : user.img,
        urank: user.rank,
        email:user.email
      };
    }
  }
})

.factory('Associations', function($http, SERVER){

  // Some dummy data for testing
  var associations = [];
  var currentAssociation = {current: ""};

  return {
    all: function() {
      return associations;
    },
    remove: function(association) {
      associations.splice(associations.indexOf(association), 1);
    },
    get: function(associationId) {
      for (var i = 0; i < associations.length; i++) {
        if (associations[i].id === parseInt(associationId)) {
          return associations[i];
        }
      }
      return null;
    },
    getAssociations: function(){
     $http({
        method: 'GET',
        url: SERVER.url + '/associations'
      }).then(function(response){
        for(var i=0;i<response.data.associations.length;i++){
          associations.unshift(response.data.associations[i]);
        }
      })
    },
    addAssociation: function(name, description){
        var newAssociation = {
          "name": name,
          "description": description
        };

        $http.post(SERVER.url + "/associations", newAssociation)
        .then(function (res){
        console.log(res);
        });
    }
  }
})

// TODO : hacer metodo para que busque entre los eventos el que desea
.factory('Search', function($http){
  // Some dummy data for testing

  var  user = {
    name: "Peter",
    img: 'img/ben.png'

  };

  user.get

  return user;
})

// TODO : ....
.factory('Events', function($http, SERVER,$state){
  // Some dummy data for testing
  var events = [];
  var currentEvent = {current: ""};

  /*var events = [{
    id:0,
    name: 'Venta de alcapurrias a PESO!!',
    desc: 'Grasa pa la dieta...',
    img:  'img/ben.png'
  }, {
    id: 1,
    name: 'Seminario de Java',
    desc: 'Que tu no sabes programar en Java?',
    img:  'img/max.png'
  }, {
    id: 2,
    name: 'Jangueo En La Cueva',
    desc: 'Nope, nope...',
    img:  'img/perry.png'
  }];
*/
  return {
    all: function() {
      return events;
    },

    remove: function(event) {
      events.splice(events.indexOf(event), 1);
    },
    get: function(eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    },

    //o: function(){return eventsTest.favorites;},

    // adds a new event to server
    addEvent: function(name, description, location, date, association){
        var newEvent = {
          "name": name,
          "description": description,
          "location": location,
          "date": date,
          "association": association
        };

        $http.post(SERVER.url + "/events", newEvent)
        .then(function (res){
        console.log(res);
        });
    },
    //deletes an event from server
    deleteEvent: function(eventId){
      $http.delete(SERVER.url + "/events/" + eventId)
      .then(function(res){
        console.log(res);
      });
    },

    //gets all events from server
    getEvents: function(){
     $http({
        method: 'GET',
        url: SERVER.url + '/events'
      }).then(function(response){
        for(var i=0;i<response.data.events.length;i++){
          events.unshift(response.data.events[i]);
        }
      })
    }
  };
});
