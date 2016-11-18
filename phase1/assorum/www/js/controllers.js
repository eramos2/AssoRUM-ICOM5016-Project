angular.module('assorum.controllers', [])

//login page controller
.controller('loginCtrl', function($scope, User, $state,$http,$q) {
    $scope.login = {};
    $scope.validLogin = {};
    //Submit function
    $scope.saveLogin = function() {
        //email or username/Password where filled

        User.getUser($scope.login.EorU, $scope.login.password).then(function(hh){
          console.log(hh);
          if(hh.value){
              //change of state
              console.log('HEllo');
              $state.go('tab.home');
          }else{
              //Missing information
              alert("Please fill out all fields");
          }
        });
        };


    //create account button function
    $scope.createAccount = function(){
      //change state to signup
      $state.go('signup');
    }

})

//Signup page controller
.controller('signupCtrl', function($scope, $state) {
    $scope.signup = {};

    //submit signup information
    $scope.saveSignup = function() {
        //verify if information was filled
        if($scope.signup.firstName && $scope.signup.lastName && $scope.signup.username
         && $scope.signup.email && $scope.signup.password && $scope.signup.confirm){
            //change state to home page
             $state.go('tab.home');
         }else{
            //information not filled completely
             alert("Please fill out all fields");
        }
    }

})


//Home page controller with list of events
.controller('HomeCtrl', function($scope, $state, User, Events, SERVER) {

  Events.getEvents();
  $scope.setCurrentEvent = function(event){
    Events.setCurrentEvent(event);
  };
  $scope.server = SERVER;
  //get all events
  $scope.events = Events.all();
  //function for removing events
  $scope.remove = function(event) {
    Events.remove(event);
  };

  //function for adding events to favorites
  $scope.addToFavorites = function(event){
    User.addToFavorites(event);
  };
  //function for deleting events
  $scope.deleteEvent = function(event){
    Events.deleteEvent(event.id);
  };

})
//Favorite page controller
.controller('favCtrl', function($scope, User, Events, $state){

  //get user favorite events
  $scope.favorites = User.getFavorites();
  //test
  console.log($scope.favorites);
  //function for deleting events from favorites
  $scope.deleteEvent = function(event){
    //remove event from favorites
    User.removeFavorite(event.id);
  };
})

//Profile controller
.controller('ProfileCtrl', function($scope, User,$state) {
  //get user profile

  $scope.logout = function(){
    $state.go('login');
  }

  $scope.user = User.getProfile();
})



//Search page controller
.controller('SearchCtrl', function($scope, Events, $http) {
  $scope.model = {term: ''};
  //get events
  Events.all();
  //search function
  $scope.search = function() {
    $scope.results = Events.all();
  };

})

//Association page controller
.controller('AssociationCtrl', function($scope,$state, SERVER, Associations, User){
  //Associations.addEvent("test", "wowow");
  //Associations.deleteAssociation(21);
  $scope.asso = Associations.getCurrentAssociation();
  $scope.setCurrentAssociation = function(assoc){
    Associations.setCurrentAssociation(assoc);
  };
  var initial_state = false;
  var editVisible = false;
  $scope.VisibleEvents = initial_state;
  $scope.editButton = editVisible;

  $scope.isAdminEV = function(){
      editVisible = true;
  }

  $scope.toggleEventList = function(){
  $scope.VisibleEvents = !$scope.VisibleEvents;
}

  Associations.getAssociations();
  $scope.associations = Associations.all();
  $scope.server = SERVER;
  //Remove association function
  $scope.remove = function(association) {
    Associations.remove(association);
  };
  //Delete Association
  $scope.deleteAssociation = function(association){
    Associations.deleteAssociation(association.id);
  };
  //Adding a membership to associations
  $scope.addMembership = function(association){
    User.addToMembership(association);
  };
})

.controller('AssoCtrl', function($scope,$state, Associations, SERVER){
  $scope.asso = Associations.getCurrentAssociation();
  $scope.setCurrentAssociation = function(assoc){
    Associations.setCurrentAssociation(assoc);
  };
  var initial_state = false;
  var editVisible = false;
  $scope.VisibleEvents = initial_state;
  $scope.editButton = editVisible;

  $scope.isAdminEV = function(){
      editVisible = true;
  };

  $scope.toggleEventList = function(){
      $scope.VisibleEvents = !$scope.VisibleEvents;
  };

  Associations.getAssociations();
  $scope.associations = Associations.all();
  $scope.server = SERVER;
  //Remove association function
  $scope.remove = function(association) {
    Associations.remove(association);
  };
  //Delete Association
  $scope.deleteAssociation = function(association){
    Associations.deleteAssociation(association.id);
  };
  //Adding a membership to associations
  $scope.addMembership = function(association){
    User.addToMembership(association);
  };

})
//Event page controller
.controller('EventCtrl',function(SERVER,$scope,$state,Events){
  $scope.event = Events.getCurrentEvent();
  console.log($scope.event);
  //Function for going back to the home tab

  /*$scope.event = {
                  event_name: "Workshop Ionic Framework",
                  eve_desc: "Ionic workshop for those interested in learning the basic and advanced techniques of ionic Framework. ",
                  location: "Anfiteatro Celis",
                  date:"28/10/2016",
                  association:"Hackertrons",
                  eimage: ["http://assorum.heroku.com/images/event/workshop_ionic_framework_small.jpeg",
                  "http://assorum.heroku.com/images/event/workshop_ionic_framework_large.jpeg"]
                }*/
  $scope.goBackHome = function(){
    $state.go('tab.home');
  }

});
