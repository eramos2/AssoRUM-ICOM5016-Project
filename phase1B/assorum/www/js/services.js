angular.module('assorum.services', [])

// TODO : modificar para que reciba dummy data de node
.factory('User', function($http){
  // Some dummy data for testing

  var  user = {
    favorites: []
  };

  return{
    addToFavorites: function(event){
      user.favorites.unshift(event);
    },
    all: function(){
      return user.favorites;
    },
    
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
.factory('Events', function(){
  // Some dummy data for testing

  var events = [{
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
    }
  };   
});

