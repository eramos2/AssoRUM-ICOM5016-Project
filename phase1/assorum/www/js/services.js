angular.module('assorum.services', [])

// TODO : modificar para que reciba dummy data de node

//User service
.factory('User', function($http){

  // Some dummy data for testing
  var user = {
    firstname: '',
    lastname:'',
    img: '',
    email:'',
    rank: '',
    favorites: [],
    membership: [],
    newFavorites: 0
  };

  return{

    getUser:function(Username,Password){
      $http({
         method: 'GET',
        url: SERVER.url + '/users/' + Username
      }).then(function(response){
         if(Username === response.data.username && Password === response.data.password){
        user.firstname = 'felitooo';
        user.lastname = 'gonzalez';
        user.email = 'felix.gonzalez3@upr.edu';
        user.rank = '';
        return true;
      }

      })
      .catch(function(err){
        return false;
      });
    },
    //function for adding a membership to a user
    addToMemberships: function(association){
      user.memberships.unshift(association);
    },
    //function for getting the memberships of a user
    getMemberships: function(association){
      return user.memberships;
    },
    //Function for adding to favorites
    addToFavorites: function(event){
      user.favorites.unshift(event);
    },
    //Funtion for getting favorite events
    getFavorites: function(){
      return user.favorites;
    },
    //Funtion for removing events from favorites
    removeFavorite: function(event) {
      user.favorites.splice(user.favorites.indexOf(event), 1);
    },
    //Function for getting profile info
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
//Association service
.factory('Associations', function($http, SERVER){

  // Some dummy data for testing
  var associations = [];
  var currentAssociation = {current: ""};

  return {
    //Function for getting all the associations, returns array.
    all: function() {
      return associations;
    },
    //Function for removing an association
    remove: function(association) {
      associations.splice(associations.indexOf(association), 1);
    },
    //Function for getting Association if it exists
    get: function(associationId) {
      for (var i = 0; i < associations.length; i++) {
        if (associations[i].id === parseInt(associationId)) {
          return associations[i];
        }
      }
      return null;
    },
    //Function for getting association from server
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
    //Function for adding a association to the server.
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

//Search service.
.factory('Search', function($http){
  // Some dummy data for testing

  var  user = {
    name: "Peter",
    img: 'img/ben.png'

  };

  user.get

  return user;
})

// Events service

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
    //Function for getting all the events
    all: function() {
      return events;
    },
    //Funtion for removing an event
    remove: function(event) {
      events.splice(events.indexOf(event), 1);
    },
    //Function for getting an event
    get: function(eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    },

    //o: function(){return eventsTest.favorites;},

    //Funtion for adding a new event to server
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
    //Funtion for deleting an event from server
    deleteEvent: function(eventId){
      $http.delete(SERVER.url + "/events/" + eventId)
      .then(function(res){
        console.log(res);
      });
    },

    //Funtion for getting all events from server
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
