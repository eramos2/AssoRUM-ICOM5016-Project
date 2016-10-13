angular.module('assorum.controllers', [])


.controller('loginCtrl', function($scope,$state) {
    $scope.login = {};

    $scope.saveLogin = function() {
        if($scope.login.EorU && $scope.login.password){
            alert("form complete");
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
             alert("Form complete");
             $state.go('tab.home');
         }else{
             alert("Please fill out all fields");
        }
    }

})

.controller('HomeCtrl', function($scope, Events) {
  $scope.events = Events.all();
  $scope.remove = function(event) {
    Events.remove(event);
  };
})

.controller('ProfileCtrl', function($scope, User) {
  $scope.username = User.name;
  $scope.userimg = User.img;

})

// TODO 
.controller('SearchCtrl', function($scope, Events, $ionicFilterBar) {
  $scope.searchQuery = "";
  $scope.events = [];

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
});
