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
    newFavorites: 0
  };

  return{
    addToFavorites: function(event){
      user.favorites.unshift(event);
    },
    getFavorites: function(){
      return user.favorites;
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

  var association = [{
    id: 0,
    name: "AAA",
    img: 'img/AAA_Logo.png',
    desc: "Asociacion atleticamente atletica"
  }]

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
.factory('Events', function($http, SERVER){
  // Some dummy data for testing
  var events = [];

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

    o: function(){return eventsTest.favorites;}, 

    addEvents: function(){
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
