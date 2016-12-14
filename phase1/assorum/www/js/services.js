angular.module('assorum.services', [])

// TODO : modificar para que reciba dummy data de node

//User service
.factory('User', function($http, SERVER, $q){

  // Some dummy data for testing
  var user = {
    username: '',
    firstname: '',
    lastname:'',
    cid: '',
    img: '',
    email:'',
    rank: '',
    favorites: [],
    memberships: [],
    billinginfo: [],
    newFavorites: 0,
    isLogged: {value:''}
  };

  return{
    hasBillingInfo: function(){
      console.log(user.billinginfo);
        if(user.billinginfo.typeofcard && user.billinginfo.address && user.billinginfo.cardnumber){
          return true;
        }else{
          return false;
        }

    },
    addUser: function(NewUser){
      user.username = NewUser.username;
      user.firstname = NewUser.firstName;
      user.lastname = NewUser.lastName;
      user.email = NewUser.email;
      user.rank = NewUser.rank;

      var cname = user.firstname +'-'+user.lastname;
      var data ={
        "username": user.username,
        "password": NewUser.password,
        "clientname" : cname,
        "c_email":user.email,
        "rankid":user.rank
      }
      console.log(data);
      var promise = $http.post(SERVER.url+"/clients",data).then(function(data){
        console.log("success bitches");
        console.log(data.data.data);
      })
      .catch(function(err){
          console.log(err);

        });
      return promise;
      /*var promise = $http({
         method: 'POST',
         data: data,
        url: SERVER.url + '/clients',
        headers: {'Content-Type':'application/json'}
      }).then(function(response){
          console.log(response.data.data);

      })
      .catch(function(err){
        console.log(err);
      });
      return promise;*/
    },

    getUser: function(Username,Password){
      user.isLogged.value = false;
      var promise = $http({
         method: 'GET',
        url: SERVER.url + '/clients/' + Username
      }).then(function(response){
      //  console.log(Username === response.data.data.username && Password === response.data.data.password);
         if(Username === response.data.data.username && Password === response.data.data.password){
           user.username = response.data.data.username;
           user.firstname = response.data.data.clientname.substring(0,response.data.data.clientname.search("-"));
           user.lastname = response.data.data.clientname.substring((response.data.data.clientname.search("-")+1),response.data.data.clientname.length);
           user.cid = response.data.data.cid;
           user.email = response.data.data.c_email;
           user.rank = response.data.data.rdescription;
           user.img = response.data.data.image;
           user.isLogged.value = true;
           return user.isLogged;
      }
      return user.isLogged;
    }).then(function(pro){
      console.log("memberships get befooouurr" + user.cid);
      $http({
         method: 'GET',
        url: SERVER.url + '/clients/' + parseInt(user.cid) + '/memberships'
      }).then(function(response){
        console.log("estamos vivos");
        for(var i=0;i<response.data.data.length;i++){
          user.memberships.unshift(response.data.data[i]);
        }
      }).then(function(pro){
        console.log("hellouuu favorites");
        $http({
           method: 'GET',
          url: SERVER.url + '/clients/' + parseInt(user.cid) + '/favorites'
        }).then(function(response){
          for(var i=0;i<response.data.data.length;i++){
            user.favorites.unshift(response.data.data[i]);
          }

      })
    }).then(function(pro){
      console.log(user.cid);
      $http({
         method: 'GET',
        url: SERVER.url + '/clients/' + parseInt(user.cid) + '/paymentmethod'
      }).then(function(response){
              console.log("hellooooou");
          console.log(response);
          user.billinginfo = response.data.data;
    })
    })
    return pro;
  })
  .catch(function(err){
    console.log(err);
  });
      return promise;
    },

    getBillingInfo: function(){
      console.log(user.billinginfo);
      return user.billinginfo;
    },
    //function for adding a membership to a user
    addToMemberships: function(membership){
      var data ={
        "mbspid": membership.mbspid,
        "cid": user.cid,
      }
      var promise = $http.post(SERVER.url+"/clients/"+user.cid+"/memberships", data).then(function(data){
        console.log("success bitches");
        console.log(data.data.data);
      })
      .catch(function(err){
          console.log(err);

        });
      return promise;
      user.memberships.unshift(association);
    },
    //function for getting the memberships of a user
    getMemberships: function(cid){
      var promise = $http({
         method: 'GET',
        url: SERVER.url + '/clients/' + parseInt(cid) + '/memberships'
      }).then(function(response){

        for(var i=0;i<response.data.data.length;i++){
          user.memberships.unshift(response.data.data[i]);
        }

      })
      .catch(function(err){
        console.log(err);
      });
      return promise;
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
    //logout user
    logout: function(){
      user.isLogged.value = false;
    },
    //Function for getting profile info
    getProfile: function(){
      return user;
    }
  }
})
//Association service
.factory('Associations', function($http, SERVER, $state){

  // Some dummy data for testing
  var associations = [];
  var currentAssociation = {current: "", events: "", memberships: ""};

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

    getCurrentAssociationMemberships: function(){
      return currentAssociation.memberships;
    },


    getCurrentAssociation: function(){
      console.log(currentAssociation.current);
      return currentAssociation.current[0];
    },

    setCurrentAssociation: function(assoid){
      $http({
   method: 'GET',
   url: SERVER.url + '/associations/'+assoid +'/events'
 }).then(function(response){
    currentAssociation.events =response.data.data;
    console.log("this are the events ");
    console.log(currentAssociation.events);
 });
      var promise = $http({
         method: 'GET',
         url: SERVER.url + '/associations/'+assoid
       }).then(function(response){
          currentAssociation.current =response.data.data;
          console.log(currentAssociation.current);
       }).then(function(){
         $http({
            method: 'GET',
            url: SERVER.url + '/associations/'+assoid+'/memberships'
          }).then(function(response){
            currentAssociation.memberships = response.data.data
          })
       })
       return promise;
    },
    //Function for getting association from server
    getAssociations: function(){
      associations = [];
     $http({
        method: 'GET',
        url: SERVER.url + '/associations'
      }).then(function(response){
        console.log(response.data.data);
        for(var i=0;i<response.data.data.length;i++){
          associations.unshift(response.data.data[i]);
        }
      })
    },

    getAssociationEvents: function(){
      console.log(currentAssociation.events);
      return currentAssociation.events;
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



//locations service.
.factory('Locations', function($http,SERVER,$state,$q){
  // Some dummy data for testing
  var locations = {locations: ""};

  return {
    locations: function(){return locations.locations},

    getLocations: function(){
      var promise = $http({
        method: 'GET',
        url: SERVER.url + '/locations'
      }).then(function(response){
          locations.locations = response.data.data
      }).catch(function(err){
        console.log(err);

      });
      return promise;
    }
  };
})

//Ranks service.
.factory('Ranks', function($http,SERVER,$state){
  // Some dummy data for testing
  var ranks = {ranks:""};

  return {
    ranks: function(){
      return ranks.ranks;
    },
    getRanks: function(){

      var promise = $http({
        method: 'GET',
        url: SERVER.url + '/ranks'
      }).then(function(response){
        ranks.ranks = response.data.data;
      }).catch(function(err){
        console.log(err);

      });
      return promise;
    }
  };
})

//Tags service.
.factory('Tags', function($http,SERVER,$state){
  // Some dummy data for testing
  var tags = {tags:""};

  return {
    tags: function(){
      return tags.tags;
    },
    getTags: function(){
      var promise = $http({
        method: 'GET',
        url: SERVER.url + '/tags'
      }).then(function(response){
        tags.tags = response.data.data;
      }).catch(function(err){
        console.log(err);

      });
      return promise;
    }
  };
})

//Search service.
.factory('Search', function($http,SERVER,$state){
  // Some dummy data for testing

  var  events = {events:""};
  var associations = {associations:""};

  return {
    getEvents: function(){
      return events.events;
    },
    getAssociations: function(){
      return associations.associations;
    },
    searchEvents:function(even){
      var promise =  $http({
        method: 'GET',
        url: SERVER.url + '/events/search/'+even
      }).then(function(response){
        events.events = response.data.data;
      }).catch(function(err){
        console.log(err);
      });
      return promise;
    },
    searchAssociations:function(asso){
      var promise =  $http({
        method: 'GET',
        url: SERVER.url + '/associations/search/'+asso
      }).then(function(response){
        associations.associations = response.data.data;
      }).catch(function(err){
        console.log(err);

      });
      return promise;
    }
  };
})

// Events service

.factory('Events', function($http, SERVER,$state,Associations){
  // Some dummy data for testing
  var events = [];
  var currentEvent = {current: "", tags: []};

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

      var promise = $http.delete(SERVER.url+"/events/"+event.eid).then(function(data){
        console.log("success bitches");
        events.splice(events.indexOf(event), 1);

      })
      .catch(function(err){
          console.log(err);
        });

      return promise;


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

    getCurrentEvent: function(){
      return currentEvent.current;
    },

    //o: function(){return eventsTest.favorites;},

    //Funtion for adding a new event to server
     addEvent: function(newEvent){
        var eventTags = {
          "Tag1": newEvent.tag1,
          "Tag2": newEvent.tag2,
          "Tag3": newEvent.tag3
        };
        var data ={
          "event_name": newEvent.name,
          "event_desc": newEvent.description,
          "eventdata": newEvent.date,
          "loc_id":newEvent.location,
          "assoid": Associations.getCurrentAssociation().assoid
        };
        console.log(data);
        console.log(eventTags);

        var promise = $http.post(SERVER.url+"/events",data).then(function(res){
          console.log("success bitches");
          console.log(res);
          data.eid = res.data.data[0];
          events.unshift(data);
          console.log(res.data.data[0]);
        })
        .catch(function(err){
            console.log(err);
          });
        return promise;

        //$http.post(SERVER.url + "/events", newEvent)
        //.then(function (res){
        //console.log(res);
        //});
    },
    //Funtion for deleting an event from server
    deleteEvent: function(eventId){
      $http.delete(SERVER.url + "/events/" + eventId)
      .then(function(res){
        console.log(res);
      });
    },

    setCurrentEvent: function(event){
      //for testing
      console.log(event);
      //currentEvent.current = event;
      /*$http({
        method: 'GET',
        url: SERVER.url + '/events/' + parseInt(event.eid)
      }).then(function(response){
        //events = []; //so events are not repeated
        //console.log(response.data.data.length)
        //console.log(response.data.data);
        for(var i=0;i<response.data.data.length;i++){
          console.log(response.data.data[i]);
          currentEvent.current = response.data.data[i];
        }
      }).catch(function(err){
        console.log(err);

      });*/
      var promise =   $http({
          method: 'GET',
          url: SERVER.url + '/events/' + parseInt(event.eid)
        }).then(function(response){
          console.log("we here to ");
          console.log(response.data.data);
          currentEvent.current = response.data.data;
        }).then(function(asd){
          $http({
      method: 'GET',
      url: SERVER.url + '/events/' + parseInt(event.eid) + '/tags'
    }).then(function(response){
      //events = []; //so events are not repeated
      //console.log(response.data.data.length)
      console.log(response.data.data);
      currentEvent.current.tags = [];
      for(var i=0;i<response.data.data.length;i++){
        currentEvent.current.tags.unshift(response.data.data[i]);
      }
        }).catch(function(err){
          console.log(err);

        });
      });


      /*$http({
  method: 'GET',
  url: SERVER.url + '/events/' + parseInt(event.eid) + '/tags'
}).then(function(response){
  //events = []; //so events are not repeated
  //console.log(response.data.data.length)
  console.log(response.data.data);
  currentEvent.current.tags = [];
  for(var i=0;i<response.data.data.length;i++){
    currentEvent.current.tags.unshift(response.data.data[i]);
  }

}).then(function(cont){
  console.log("started from the bottom now we here");
  console.log(currentEvent.current.eid);
  $http({
    method: 'GET',
    url: SERVER.url + '/events/' + parseInt(currentEvent.current.eid)
  }).then(function(response){
    console.log("we here to ");
    console.log(response.data.data);
    currentEvent.current = response.data.data;
  }).catch(function(err){
    console.log(err);

  });*/
return promise;

    },

    //Funtion for getting all events from server
    getEvents: function(){
      $http({
        method: 'GET',
        url: SERVER.url + '/events'
      }).then(function(response){
        //events = []; //so events are not repeated
        //console.log(response.data.data.length)
        //console.log(response.data.data);
        for(var i=0;i<response.data.data.length;i++){
          events.unshift(response.data.data[i]);
        }
      }).catch(function(err){
        console.log(err);

      });

    }
  };
});
