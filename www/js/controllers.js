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

  .controller('welcomeCtrl', function ($scope , $rootScope) {
    $scope.keywords= "";
    $scope.location= "";
   $rootScope.UserName=null;
    $scope.password="";
    





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

  .controller('searchResultsCtrl', function ($scope, $stateParams,JobService) {
    $scope.results = JobService.search($stateParams.keywords, $stateParams.location);

  })

  .controller('jobDetailsCtrl', function ($scope, $stateParams, JobService) {
    $scope.job = JobService.getDetails($stateParams.jobId);
//    alert(JSON.stringify($scope.job))
  })

  .controller('applicationsCtrl', function ($scope,$rootScope,ApplicationService) {
    $scope.applications={};
     $scope.applications = ApplicationService.getApplications($rootScope.UserName);

  })

  .controller('bookmarksCtrl', function ($scope) {

  });



