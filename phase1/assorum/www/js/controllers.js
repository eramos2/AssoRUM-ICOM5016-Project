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
.controller('loginCtrl', function($scope, User, $state,$http,$q,$ionicSideMenuDelegate,$ionicHistory,Ranks) {
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
      Ranks.getRanks().then(function(){
        //change state to signup
        $state.go('signup');
      });

    }

})

//Signup page controller
.controller('signupCtrl', function($scope, $state, User ,$ionicSideMenuDelegate,Ranks) {
  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });

    $scope.signup = {};
    $scope.Ranks = Ranks.ranks();
    //submit signup information
    $scope.saveSignup = function() {
        //verify if information was filled
        if($scope.signup.firstName && $scope.signup.lastName && $scope.signup.username
         && $scope.signup.email && $scope.signup.password && $scope.signup.confirm){
            //change state to home page
            //console.log($scope.signup);
            User.addUser($scope.signup);
            $state.go('tab.home');
         }else{
            //information not filled completely
             alert("Please fill out all fields");
        }
    }

})


//Home page controller with list of events
.controller('HomeCtrl', function($scope, $state, User, Events, SERVER, $ionicSideMenuDelegate, $ionicHistory,$ionicViewService) {

  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
      $ionicHistory.clearHistory();
      $ionicViewService.clearHistory()
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
    Events.setCurrentEvent(event).then(function(response){
      $state.go('tab.event');
    });
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

    $scope.setCurrentEvent = function(event){
      Events.setCurrentEvent(event).then(function(response){
        $state.go('tab.event');
      });
    };

  //get user favorite events
  $scope.favorites = User.getFavorites();
  //test
  console.log(User.getFavorites());
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
  $scope.resultAsso = ['papa','tu','soy','yo'];
  $scope.resultEvent = ['jjij'];

  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.showAsso = false;
  $scope.showEvent = false;
  $scope.word = {};

  $scope.searchAssociation= function(){
    $scope.showEvent = false;
    $scope.showAsso = true;

    console.log($scope.word.keyword);
  }
  $scope.searchEvent= function(){
    $scope.showEvent = true;
    $scope.showAsso = false;
    console.log($scope.word.keyword);
  }
  //get events
  Events.all();
  //search function
  $scope.search = function() {
    $scope.results = Events.all();
  };

})

//Association page controller

.controller('AssociationCtrl', function($scope,$state, SERVER,$ionicPopup, Associations, User,$ionicModal,$ionicTabsDelegate, Events, $ionicHistory,Ranks,Tags,Locations){
  //Associations.addEvent("test", "wowow");
  //Associations.deleteAssociation(21);
  $scope.newEvent = {};
  $scope.asso = Associations.getCurrentAssociation();
  $scope.assoevents = Associations.getAssociationEvents();
  $scope.tags = Tags.tags();
  $scope.locations = Locations.locations();
  $scope.memberships = Associations.getCurrentAssociationMemberships()
  console.log($scope.locations);

  $scope.showConfirm = function() {
  var confirmPopup = $ionicPopup.confirm({
    title: 'Want to be a member?',
    template: 'Are you sure you want to get this membership?'
  });
  confirmPopup.then(function(res) {
    if(res) {
      //if true
      var alertPopup = $ionicPopup.alert({
        title: 'Congratulations!',
        template: 'You are now a member of ...'
      });
      alertPopup.then(function(res) {
        //after pressing ok
      });

    } else {
      //if not true
    }
  });
};

  $scope.saveNewEvent = function() {
      //verify if information was filled
      if($scope.newEvent.name && $scope.newEvent.description && $scope.newEvent.date){
          //change state to home page
          console.log($scope.newEvent);
          $scope.newEvent={};
          $scope.modal.hide();

       }else{
          //information not filled completely
           alert("Please fill out all fields");
      }
  }
  $ionicModal.fromTemplateUrl('templates/postEvent.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });


    $scope.setCurrentEvent = function(event){
      Events.setCurrentEvent(event).then(function(response){
        $state.go('tab.event2');
      });
    };
/*    $scope.setCurrentEvent = function(event){
      Events.setCurrentEvent(event);
    };*/


  console.log($scope.assoevents);
  var initial_state = false;
  var ms_init_state = false;
  var editVisible = false;
  $scope.VisibleEvents = initial_state;
  $scope.VisibleMemberships = ms_init_state;
  $scope.editButton = editVisible;

  $scope.isAdminEV = function(){
      editVisible = true;
  }
  $scope.toggleMsList = function(){
  $scope.ms_init_state = !$scope.ms_init_state;
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

.controller('AssoCtrl', function($scope,$state, Associations, SERVER, $ionicNavBarDelegate,Events, $ionicSideMenuDelegate,$ionicTabsDelegate){
  $ionicNavBarDelegate.showBackButton(true);

  //$scope.$on('$ionicView.enter', function(){
  //    $ionicSideMenuDelegate.toggleLeft();
  //  });

  //$scope.events = Associations.getAssociationEvents($scope.asso.assoid);
  $scope.setCurrentAssociation = function(assoid){
    Associations.setCurrentAssociation(assoid).then(function(hh){
      $state.go('tab.association-page');
    });
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
.controller('BillInfoCtrl',function(SERVER, $scope,$state,$ionicSideMenuDelegate,$ionicModal){
  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.toggleRight();
    });
    $ionicModal.fromTemplateUrl('templates/fillBill.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
})

.controller('MembershipCtrl',function($scope,$state,SERVER,$ionicSideMenuDelegate, User, Associations){
  $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.toggleLeft();
    });
  $scope.user = User.getProfile();
  $scope.setCurrentAssociation = function(assoid){
    console.log(assoid);
    Associations.setCurrentAssociation(assoid).then(function(hh){
      $state.go('tab.association-page');
    });
  };
})

//Event page controller
.controller('EventCtrl',function(SERVER,$scope,$state,Events, Associations,$ionicTabsDelegate,Tags,Locations){
  $scope.event = Events.getCurrentEvent()
  $scope.setCurrentAssociation = function(assoid){
    console.log(assoid);
    console.log($scope.event.assoid);
    Associations.setCurrentAssociation(assoid).then(function(hh){
      Locations.getLocations().then(function(){
        Tags.getTags().then(function(){
          $state.go('tab.association-page');
        })
      });
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

})
.controller('EventCtrl2',function(SERVER,$scope,$state,Events, Associations,$ionicTabsDelegate){

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
