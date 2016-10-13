angular.module('assorum.services', [])


.factory('User', function($http){
  // Some dummy data for testing

  var  user = {
    name: "Peter",
    img: 'img/ben.png'
  };

  user.get

  return user;  
})


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
})


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
