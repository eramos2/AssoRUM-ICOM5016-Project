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
    memberships: [],
    newFavorites: 0
  };

  return{
    addToFavorites: function(event){
      user.favorites.unshift(event);
    },
    getFavorites: function(){
      return user.favorites;
    },
    addToMemberships: function(association){
      user.memberships.unshift(association);
    },
    getMemberships: function(association){
      return user.memberships;
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

.factory('Association', function($http){
  // Some dummy data for testing
  var associations = [];
  var currentAssociation = {current: ""};

  return {
    all: function() {
      return associatios;
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

    addAssociation: function(name, description){
        var newAssociation = {
          "name": name,
          "description": description
        };

        $http.post(SERVER.url + "/associations", newAssociation)
        .then(function (res){
        console.log(res);
        });
    },

    deleteAssociation: function(associationId){
      $http.delete(SERVER.url + "/associations/" + associationsId)
      .then(function(res){
        console.log(res);
      });
    },


    getAssociations: function(){
     $http({
        method: 'GET',
        url: SERVER.url + '/associations'
      }).then(function(response){
        for(var i=0;i<response.data.events.length;i++){
          associations.unshift(response.data.associations[i]);
        }
      })
    }
  };
})

// TODO : hacer metodo para que busque entre los eventos el que desea
.factory('Search', function($http){
  // Some dummy data for testing

  var  user = {
    name: "Peter",
    img: 'img/ben.png'

  };


  return user;
})


.factory('Events', function($http, SERVER, $state){
  // Some dummy data for testing
  var events = [];
  var currentEvent = {current: ""};

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

    deleteEvent: function(eventId){
      $http.delete(SERVER.url + "/events/" + eventId)
      .then(function(res){
        console.log(res);
      });
    },


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


