angular.module('starter.controllers', ['ionic'])

.controller('loginCtrl', function($scope,$state) {
    $scope.login = {};

    $scope.saveLogin = function() {
        if($scope.login.EorU && $scope.login.password){
            alert("form complete");
            $state.go('homeFeed');
        }else{
            alert("Please fill out all fields");
        }

    }
  
})

.controller('signupCtrl', function($scope, $state) {
    $scope.signup = {};

    $scope.saveSignup = function() {
        if($scope.signup.firstName && $scope.signup.lastName && $scope.signup.username
         && $scope.signup.email && $scope.signup.password && $scope.signup.confirm){
             alert("Form complete");
             $state.go('homeFeed');
         }else{
             alert("Please fill out all fields");
        }
    }

})

.controller('homeCtrl', function($scope){

});
