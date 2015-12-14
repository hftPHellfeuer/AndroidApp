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

  .controller('welcomeCtrl', function ($scope ,$state, LoginService, JobService) {
    $scope.keywords= JobService.getFilterKeywords();
    $scope.location= JobService.getFilterLocation();
    $scope.username = LoginService.getUser();

    $scope.search = function(){
      JobService.setFilterKeywords(this.keywords);
      JobService.setFilterLocation(this.location);
      JobService.update();
      $state.go('searchResults',{},{reload:true});
    }
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

  .controller('filterCtrl', function ($scope,$http, $ionicPopover, JobService){
    initFilter();

      $http({method: 'GET', url: 'http://jobcenter-hftspws10.rhcloud.com/rest/util/getjobfield'})
        .success(function (result) {
          $scope.jobFields = result;
        })

    $ionicPopover.fromTemplateUrl('popover-field.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popoverField = popover;
    });
    $ionicPopover.fromTemplateUrl('popover-type.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popoverType = popover;
    });
    $ionicPopover.fromTemplateUrl('popover-education.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popoverEducation = popover;
    });

    $scope.openPopoverField = function($event) {
      $scope.popoverField.show($event);
    };
    $scope.closePopoverField = function() {
      $scope.popoverField.hide();
    };
    $scope.openPopoverType = function($event) {
      $scope.popoverType.show($event);
    };
    $scope.closePopoverType = function() {
      $scope.popoverType.hide();
    };
    $scope.openPopoverEducation = function($event) {
      $scope.popoverEducation.show($event);
    };
    $scope.closePopoverEducation = function() {
      $scope.popoverEducation.hide();
    };

    $scope.applyFilter = function(filter){
      JobService.setFilterEducation(filter.education);
      JobService.setFilterSalary(filter.salary);
      JobService.setFilterExperience(filter.experience);
      JobService.setFilterField(filter.field);
      JobService.setFilterType(filter.type);
      JobService.setFilterKeywords(filter.keywords);
      JobService.setFilterLocation(filter.location);
      JobService.update();
    }

    $scope.resetFilter = function(){
      JobService.setFilterEducation("");
      JobService.setFilterSalary(0);
      JobService.setFilterExperience(0);
      JobService.setFilterField("");
      JobService.setFilterType("");
      JobService.update();
      initFilter();
    }

    function initFilter(){
      $scope.filter = {};
      $scope.filter.salary = JobService.getFilterSalary();
      $scope.filter.experience = JobService.getFilterExperience();
      $scope.filter.field =JobService.getFilterField();
      $scope.filter.type = JobService.getFilterType();
      $scope.filter.education = JobService.getFilterEducation();
      $scope.filter.keywords = JobService.getFilterKeywords();
      $scope.filter.location = JobService.getFilterLocation();
    }

  })

  .controller('searchResultsCtrl', function ($scope, $ionicSideMenuDelegate, JobService) {

    $scope.dragContent = false; // enables scrolling on left side
    $scope.JobOffers = JobService.getJobOffers();
    $scope.isLoading = JobService.isLoading();


    $scope.$on('jobListChanged', function() {
      $scope.JobOffers = JobService.getJobOffers();
    });

    $scope.$on('loadingStateChanged', function() {
      $scope.isLoading = JobService.isLoading();
    });

    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  })

  .controller('jobDetailsCtrl', function ($scope, $stateParams, JobService) {
    $scope.job = JobService.getJobDetails($stateParams.jobId);
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



