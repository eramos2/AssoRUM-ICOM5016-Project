angular.module('assorum.controllers', [])

//login page controller
.controller('loginCtrl', function($scope,$state) {
    $scope.login = {};

    //Submit function
    $scope.saveLogin = function() {
        //email or username/Password where filled
        if($scope.login.EorU && $scope.login.password){
            //change of state
            $state.go('tab.home');
        }else{
            //Missing information
            alert("Please fill out all fields");
        }

    }
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
.controller('ProfileCtrl', function($scope, User) {
  //get user profile
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

.controller('AssoCtrl', function($scope,$state){

})
//Event page controller
.controller('EventCtrl',function(SERVER,$scope,$state,Events){
  //Function for going back to the home tab
  $scope.goBackHome = function(){
    $state.go('tab.home');
  }
});
