// Ionic AssoRum App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'assorum' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'assorum.services' is found in services.js
// 'assorum.controllers' is found in controllers.js
// 'jett.ionic.filter.bar' is for the ionic filter bar
angular.module('assorum', ['ionic', 'assorum.controllers', 'assorum.services', 'jett.ionic.filter.bar'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.directive('ionView', function ($rootScope) {
    return {
      restrict: 'EA',
      priority: 6666,
      link    : function ($scope, element, attrs) {
        $scope.$on("$ionicView.beforeEnter", function () {
          $rootScope.hideTabs = 'hideTabs' in attrs || false;
        });
      }
    };
  })
//setup states all the states of the app
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'loginCtrl'
  })
  //Sign up page state
  .state('signup', {
     url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'signupCtrl'
  })

  //home page state
  .state('tab.home', {
    url: "/home",
      views: {
        'tab-home': {
          templateUrl: "templates/tab-home.html",
          controller: 'HomeCtrl'
      }}})
    //Event page state from home
    .state('tab.event',{
      url:"/event",
      views:{
        'tab-home':{
          templateUrl:"templates/event-page.html",
          controller:'EventCtrl'
        }
        }})
      .state('tab.event2',{
        url:"/event2",
        views:{
          'tab-home':{
        templateUrl:"templates/event-page2.html",
        controller:'EventCtrl2'
        }}})
        .state('tab.event3',{
          url:"/event3",
          views:{
            'tab-favorites':{
          templateUrl:"templates/event-page3.html",
          controller:'EventCtrl3'
          }}})
          .state('tab.event4',{
            url:"/event4",
            views:{
              'tab-favorites':{
            templateUrl:"templates/event-page4.html",
            controller:'EventCtrl4'
            }}})
            .state('tab.event5',{
              url:"/event5",
              views:{
                'tab-search':{
              templateUrl:"templates/event-page5.html",
              controller:'EventCtrl5'
              }}})
              .state('tab.event6',{
                url:"/event6",
                views:{
                  'tab-search':{
                templateUrl:"templates/event-page6.html",
                controller:'EventCtrl6'
                }}})
    //favorite tab state
    .state('tab.favorites', {
    url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/tab-favorites.html',
          controller: 'favCtrl'
      }}})
    //profile tab state
    .state('tab.profile', {
      url: '/profile',
      views: {
          'tab-home':{
          templateUrl: "templates/tab-profile.html",
          controller: 'ProfileCtrl'
      }
    }})
    //search tab state
  .state('tab.search', {
    url: '/search',
    views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl'
      }}})
  //Association tab state
  .state('tab.asso',{
    url:'/asso',
    views:{
      'tab-home':{
        templateUrl:'templates/tab-asso.html',
        controller: "AssoCtrl"
      }}})

      .state('tab.billing',{
        url:'/billingInfo',
        views:{
          'tab-home':{
            templateUrl:'templates/billingInfo.html',
            controller: "BillInfoCtrl"
          }}})

          .state('tab.membership',{
        url:'/membership',
        views:{
          'tab-home':{
            templateUrl:'templates/user-ms.html',
            controller: "MembershipCtrl"
          }}})

  //Association page state
  .state('tab.association-page',{
    url:"/association",
    views:{
     'tab-home':{
    templateUrl:"templates/association.html",
    controller:"AssociationCtrl"
      }
    }})
    .state('tab.association-page2',{
      url:"/association2",
      views:{
       'tab-favorites':{
      templateUrl:"templates/association2.html",
      controller:"AssociationCtrl2"
        }
      }})
      .state('tab.association-page3',{
        url:"/association3",
        views:{
         'tab-search':{
        templateUrl:"templates/association3.html",
        controller:"AssociationCtrl3"
          }
        }});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})
//server state
.constant('SERVER', {
  // Local server
  //url: 'http://localhost:3000'

  // Public Heroku server
  url: 'https://assorum2.herokuapp.com'
});
