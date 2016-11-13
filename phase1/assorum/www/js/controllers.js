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
    //change state to signup
    $scope.createAccount = function(){
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
  $scope.events = Events.all();
  $scope.remove = function(event) {
    Events.remove(event);
  };

  $scope.addToFavorites = function(event){
    User.addToFavorites(event);
  };

  $scope.deleteEvent = function(event){
    Events.deleteEvent(event.id);
  };

})

.controller('favCtrl', function($scope, User, Events, $state){

  $scope.favorites = User.getFavorites();
  console.log($scope.favorites);
  $scope.deleteEvent = function(event){
    User.removeFavorite(event.id);
  };
})

.controller('ProfileCtrl', function($scope, User) {
  $scope.user = User.getProfile();
})



// 
.controller('SearchCtrl', function($scope, Events, $http) {
  $scope.model = {term: ''};
  Events.getEvents();
  $scope.search = function() {
    $scope.results = Events.all();
  };

})

.controller('AssociationCtrl', function($scope,$state, SERVER, Associations, User){
  //Associations.addEvent("test", "wowow");
  //Associations.deleteAssociation(21);
  Associations.getAssociations();
  $scope.associations = Associations.all();
  $scope.server = SERVER;
  $scope.remove = function(association) {
    Associations.remove(association);
  };
  $scope.deleteAssociation = function(association){
    Associations.deleteAssociation(association.id);
  };
  $scope.addMembership = function(association){
    User.addToMembership(association);
  };
})

.controller('AssoCtrl', function($scope,$state){

})

.controller('EventCtrl',function(SERVER,$scope,$state,Events){
  $scope.goBackHome = function(){
    $state.go('tab.home');
  }
});
