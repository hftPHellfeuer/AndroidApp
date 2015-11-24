angular.module('Workforce.controllers', [])

  .controller('loginCtrl', function ($scope) {

  })

  .controller('welcomeCtrl', function ($scope) {
    $scope.keywords= "";
    $scope.location= "";
  })

  .controller('registerCtrl', function ($scope) {

  })

  .controller('searchResultsCtrl', function ($scope, $stateParams,JobService) {
    $scope.results = JobService.search($stateParams.keywords, $stateParams.location);

  })

  .controller('jobDetailsCtrl', function ($scope, $stateParams, JobService) {
    $scope.job = JobService.getDetails($stateParams.jobId);
//    alert(JSON.stringify($scope.job))
  })

  .controller('applicatonsCtrl', function ($scope) {

  })

  .controller('bookmarksCtrl', function ($scope) {

  });



