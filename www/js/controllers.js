angular.module('Workforce.controllers', [])

  .controller('loginCtrl', function ($scope) {

  })

  .controller('welcomeCtrl', function ($scope) {
    $scope.keywords= "";
    $scope.location= "";
  })

  .controller('registerCtrl', function ($scope) {

  })

  .controller('searchResultsCtrl', function ($scope, $stateParams,$ionicSideMenuDelegate, JobService) {
    JobService.search($stateParams.keywords, $stateParams.location).then(function (result)
    {
      $scope.results = result.data;
      $scope.allResults = result.data;
    });

    $scope.filters = [
      'Develop',
      'Engi',
      'Stuttgart'
    ];

    $scope.filterBy = function(filter){
      if(filter === 'all'){
        return $scope.results = $scope.allResults;
      }
      $scope.results = $scope.allResults.filter(function(job){return job.title.indexOf(filter) > -1;})
    }

    $scope.filterSearchDescription = function(search){
      if(search === ''){
       // return $scope.results = $scope;
      } else {
        $scope.results = $scope.allResults.filter(function (job) {
          return job.description.indexOf(search) > -1;
        })
      }
    }


    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  })

  .controller('jobDetailsCtrl', function ($scope, $stateParams, JobService) {
    $scope.job = JobService.getDetails($stateParams.jobId);
    $scope.$apply();
//    alert(JSON.stringify($scope.job))

  })

  .controller('applicatonsCtrl', function ($scope) {

  })

  .controller('bookmarksCtrl', function ($scope) {

  })

.controller('filterCtrl', function ($scope) {

})
