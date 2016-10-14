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

<<<<<<< HEAD
.controller('HomeCtrl', function($scope, User, Events, SERVER) {
  Events.addEvents();
  $scope.server = SERVER;
=======
.controller('HomeCtrl', function($scope, User, Events, $state) {
>>>>>>> origin/working
  $scope.events = Events.all();
  $scope.remove = function(event) {
    Events.remove(event);
  };

  $scope.addToFavorites = function(event){
    User.addToFavorites(event);
  }
  $scope.eventClicked= function(){
    $state.go('event');
  }
})

.controller('rumFCtrl', function($scope){

})

.controller('favCtrl', function($scope, User, Events){

  $scope.favorites = User.getFavorites();
  console.log($scope.favorites);
})

.controller('ProfileCtrl', function($scope, User) {
  $scope.user = User.getProfile();
})



// TODO
.controller('SearchCtrl', function($scope, Events, $http) {
  $scope.model = {term: ''};

  $scope.search = function() {
    $scope.results = Events.all();
  };

})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('EventCtrl',function($scope,$state){
  }
);
