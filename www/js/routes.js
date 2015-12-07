/**
 * Created by Patrick on 23.11.2015.
 */
angular.module('Workforce.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      })

      .state('register.student', {
        url: '/student',
        views: {
          'student-tab':{templateUrl: 'templates/student.html',
            controller: 'registerCtrl'}
          }

      })

      .state('register.enterprise', {
        url: '/enterprise',
        views: {
          'enterprise-tab':{templateUrl: 'templates/enterprise.html',
          controller: 'registerCtrl'}
        }

      })

      .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeCtrl'
      })

      .state('searchResults', {
        url: '/searchResults/{keywords}/{location}',
        templateUrl: 'templates/searchResults.html',
        controller: 'searchResultsCtrl'
      })

      .state('jobDetails', {
        url: '/jobDetails/{jobId}',
        templateUrl: 'templates/jobDetails.html',
        controller: 'jobDetailsCtrl'
      })

      .state('applications', {
        url: '/applications',
        templateUrl: 'templates/applications.html',
        controller: 'applicationsCtrl'
      })

      .state('bookmarks', {
        url: 'bookmarks',
        templateUrl: 'templates/bookmarks.html',
        controller: 'bookmarksCtrl'
      });



    // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/welcome');

      });

