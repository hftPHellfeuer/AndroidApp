
angular.module('Workforce.controllers', ['ngCordova'])
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
    $scope.pwOK = false;
    $scope.compare_student=false;
    $scope.compare_enterprise=false



    $scope.Student_Register = function(){
      console.log($scope.value);
      RegisterService.register_Student($scope.value);


      };

    $scope.enterprise_register = function(){

      console.log($scope.entprisevalue);
      RegisterService.register_Enterprise($scope.entprisevalue);
    }

    $scope.checkPassword = function()
    {
      if($scope.Student_Register){
        $scope.compare_student =angular.equals($scope.value.password, $scope.value.confirm_password);

      }
      if($scope.enterprise_register) {
        $scope.compare_enterprise =angular.equals($scope.entprisevalue.password, $scope.entprisevalue.confirm_password);
      }


    }
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

  .controller('applicationsCtrl', function ($scope,$rootScope,ApplicationService) {
    $scope.applications={};
     $scope.applications = ApplicationService.getApplications($rootScope.UserName);

  })

  .controller('bookmarksCtrl', function ($scope) {

  })

.controller('filterCtrl', function ($scope) {

})

.controller('ImageController', ['$scope','$rootScope','$cordovaCamera',function ($scope, $cordovaCamera,$cordovaImagePicker) {


  $scope.ready = false;
  $scope.images = [];

$scope.ChoosePhoto = function()
{

  var options = {
    maximumImagesCount: 10,
    width: 800,
    height: 800,
    quality: 80
  };

  $cordovaImagePicker.getPictures(options) .then(function (results) {
    for (var i = 0; i < results.length; i++) {
      console.log('Image URI: ' + results[i]);
    }
  }, function(error) {
    // error getting photos
  });

}
}])
