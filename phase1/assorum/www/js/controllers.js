angular.module('assorum.controllers', [])


.controller('loginCtrl', function($scope,$state) {
    $scope.login = {};
    $scope.saveLogin = function() {
        if($scope.login.EorU && $scope.login.password){
            $state.go('tab.home');
        }else{
            alert("Please fill out all fields");
        }

    }
    $scope.createAccount = function(){
      $state.go('signup');
    }

})

.controller('signupCtrl', function($scope, $state) {
    $scope.signup = {};

    $scope.saveSignup = function() {
        if($scope.signup.firstName && $scope.signup.lastName && $scope.signup.username
         && $scope.signup.email && $scope.signup.password && $scope.signup.confirm){
             $state.go('tab.home');
         }else{
             alert("Please fill out all fields");
        }
    }

})

.controller('HomeCtrl', function($scope, $state, User, Events, SERVER) {



  //Events.addEvent("test", "wowow", "amadeus", "hoy", "losmatapuercos");
  //Events.deleteEvent(21);
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



// TODO
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
