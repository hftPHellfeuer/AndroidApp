angular.module('Workforce.controllers', [])
  .controller('loginCtrl', function ($scope,LoginService,$state,$rootScope){
    $scope.data={};
    $scope.login = function() {
      LoginService.loginUser($scope.data.Email, $scope.data.password).success(function (data) {
        $rootScope.setUsername($scope.data.Email)
        $state.go('welcome',{},{reload:true});
      }).error(function(data) {

        alert('login failed : incorrect username or password');
      });

    }


    $scope.logout = function(){
      console.log('This is the login function')
      LoginService.logoutUser();
      $scope.SetUsername=null;
     $state.go('welcome',{},{reload:true})
      $rootScope.apply();


}


    $rootScope.setUsername = function(name) {
      $rootScope.UserName = name;

    }




  })

  .controller('welcomeCtrl', function ($scope , $rootScope, LoginService) {
    $scope.keywords= "";
    $scope.location= "";
   $rootScope.UserName=null;
    $scope.password="";
    $scope.username = LoginService.getUser();
})

  .controller('registerCtrl', function ($scope,RegisterService) {

    $scope.value={};
    $scope.entprisevalue={};


    $scope.Student_Register = function(){
      console.log($scope.value);
      RegisterService.register_Student($scope.value);


      };

    $scope.enterprise_register = function(){

      console.log($scope.entprisevalue);
      RegisterService.register_Enterprise($scope.entprisevalue);
    }
  })

  .controller('searchResultsCtrl', function ($scope, $stateParams,$ionicSideMenuDelegate, JobService) {
    $scope.filter = {};
    $scope.filter.salary = 0;
    $scope.filter.experience = 0;
    $scope.filter.keywords = $stateParams.keywords;
    $scope.filter.location = $stateParams.location;
    $scope.dragContent = false; // enables scrolling on left side

    JobService.search($stateParams.keywords, $stateParams.location).then(function (result)
    {
      $scope.jobOffers = result.data;
      $scope.allResults = result.data;
    });


    $scope.filterBy = function(filter){
      if(filter === 'all'){
        return $scope.jobOffers = $scope.allResults;
      }
      $scope.jobOffers = $scope.allResults.filter(function(job){return job.title.indexOf(filter) > -1;})
    }

    $scope.filterSearchDescription = function(search){
      if(search === ''){
       // return $scope.results = $scope;
      } else {
        $scope.jobOffers = $scope.allResults.filter(function (job) {
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

  })

  .controller('applicationsCtrl', function ($scope,LoginService,ApplicationService) {
    $scope.applications={};
    ApplicationService.getApplications(LoginService.getUser()).then(function (result)
    {
      $scope.applications = result.data;
    });
  })

  .controller('bookmarksCtrl', function ($scope,LoginService,BookmarkService) {
    $scope.bookmarks={};
    BookmarkService.getBookmarks(LoginService.getUser()).then(function (result)
    {
      $scope.bookmarks = result.data;
    });
  })



