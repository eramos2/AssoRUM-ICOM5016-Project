angular.module('assorum.controllers', [])

.controller('NavCtrl', function($scope,$ionicSideMenuDelegate){
  $scope.showMenu = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function(){
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabLocalCtrl', function($scope, $state) {
  console.log('HomeTabLocalCtrl');

  $scope.onTabSelected = function() {
    $state.go('tab.home');
  }

})

//login page controller
.controller('loginCtrl', function($scope, User, $state,$http,$q,$ionicSideMenuDelegate,$ionicHistory) {
  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
      $ionicHistory.clearHistory();
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
    $scope.login = {};
    $scope.validLogin = {};
    //Submit function
    $scope.saveLogin = function() {
        //email or username/Password where filled

        User.getUser($scope.login.EorU, $scope.login.password).then(function(hh){
          console.log(hh);
          if(hh.value){
              //change of state
              console.log('Hello');
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
.controller('signupCtrl', function($scope, $state,$ionicSideMenuDelegate) {
  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
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
.controller('HomeCtrl', function($scope, $state, User, Events, SERVER, $ionicSideMenuDelegate, $ionicHistory) {

  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
      $ionicHistory.clearHistory();
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });

    $scope.clearHistory = function(){
      $ionicHistory.goBack(-100);
    };

  Events.getEvents();
  //get all events

  $scope.events = Events.all();


  $scope.getNewData = function() {
    //do something to load your new data here
    Events.getEvents();
    $scope.events = Events.all();
    console.log($scope.events);
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.setCurrentEvent = function(event){
    Events.setCurrentEvent(event);
  };
  $scope.server = SERVER;

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
.controller('favCtrl', function($scope, User, Events, $state, $ionicSideMenuDelegate){

  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });

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
.controller('ProfileCtrl', function($scope, User,$state,$ionicNavBarDelegate,$ionicSideMenuDelegate) {
  //get user profile
  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.toggleLeft();
    });
  $scope.user = User.getProfile();
  $ionicNavBarDelegate.showBackButton(true);

  $scope.logout = function(){
    User.logout();
    $state.go('login');
  }
})



//Search page controller
.controller('SearchCtrl', function($scope, Events, $http, $ionicSideMenuDelegate){

  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });

  $scope.model = {term: ''};
  //get events
  Events.all();
  //search function
  $scope.search = function() {
    $scope.results = Events.all();
  };

})

//Association page controller
.controller('AssociationCtrl', function($scope,$state, SERVER, Associations, User,$ionicModal){
  //Associations.addEvent("test", "wowow");
  //Associations.deleteAssociation(21);
  $ionicModal.fromTemplateUrl('templates/postEvent.html', {
      id:'1',
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $scope.asso = Associations.getCurrentAssociation();
  $scope.assoevents = Associations.getAssociationEvents($scope.asso.assoid).then(function(events){
    console.log(events);
    return events;
  });
  console.log($scope.assoevents);
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

  //Associations.getAssociations();
  //$scope.associations = Associations.all();
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

.controller('AssoCtrl', function($scope,$state, Associations, SERVER, $ionicNavBarDelegate,$ionicSideMenuDelegate,$ionicTabsDelegate){
  $ionicNavBarDelegate.showBackButton(true);

  //$scope.$on('$ionicView.enter', function(){
  //    $ionicSideMenuDelegate.toggleLeft();
  //  });

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
.controller('BillInfoCtrl',function(SERVER, $scope,$state,$ionicSideMenuDelegate){
  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.toggleRight();
    });
})

.controller('MembershipCtrl',function($scope,$state,SERVER,$ionicModal,$ionicSideMenuDelegate){
  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.toggleLeft();
    });
})

//Event page controller
.controller('EventCtrl',function(SERVER,$scope,$state,Events, Associations){
  $scope.event = Events.getCurrentEvent()
  $scope.setCurrentAssociation = function(assoid){
    console.log(assoid);
    console.log($scope.event.assoid);
    Associations.setCurrentAssociation(assoid).then(function(hh){
      $state.go('tab.association-page');
    });
  };
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
