angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('loginAtWorkForce', {
      url: '/login',
      templateUrl: 'templates/loginAtWorkForce.html',
      controller: 'loginAtWorkForceCtrl'
    })
        
      
    
      
        
    .state('welcomePatrick', {
      url: '/startup_registered_student',
      templateUrl: 'templates/welcomePatrick.html',
      controller: 'welcomePatrickCtrl'
    })
        
      
    
      
        
    .state('registerAtWorfForce', {
      url: '/register',
      templateUrl: 'templates/registerAtWorfForce.html',
      controller: 'registerAtWorfForceCtrl'
    })
        
      
    
      
        
    .state('welcome', {
      url: '/startup_unregistered',
      templateUrl: 'templates/welcome.html',
      controller: 'welcomeCtrl'
    })
        
      
    
      
        
    .state('searchResults', {
      url: '/search_results',
      templateUrl: 'templates/searchResults.html',
      controller: 'searchResultsCtrl'
    })
        
      
    
      
        
    .state('jobDetails', {
      url: '/jobDetails',
      templateUrl: 'templates/jobDetails.html',
      controller: 'jobDetailsCtrl'
    })
        
      
    
      
        
    .state('myApplicatons', {
      url: '/myApplications',
      templateUrl: 'templates/myApplicatons.html',
      controller: 'myApplicatonsCtrl'
    })
        
      
    
      
        
    .state('myBookmarks', {
      url: '/myBookmarks',
      templateUrl: 'templates/myBookmarks.html',
      controller: 'myBookmarksCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/startup_unregistered');

});