angular.module('Workforce.controllers', [])
  .controller('loginCtrl', function ($scope,LoginService,$state,$rootScope){
    $scope.data={};
    $scope.login = function() {

      LoginService.loginUser($scope.data.Email, $scope.data.password).then(function (data) {
        $state.go('welcome',{},{reload:true});
      }),(function(data) {

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

  .controller('registerCtrl', function ($scope,$http,RegisterService,$state) {

    $scope.value={};
    $scope.entprisevalue={};
        $scope.pwOK = false;
    $scope.compare_student=false;
    $scope.compare_enterprise=false


    $scope.Student_Register = function(){

      RegisterService.setStudentFirstname($scope.value.FirstName);
      RegisterService.setStudentLastname($scope.value.LastName);
      RegisterService.setStudentBirthdate($scope.value.BirthDate);
      RegisterService.setStudentGender($scope.value.Gender);
      RegisterService.setStudentEmail($scope.value.Email);
      RegisterService.setStudentPassword($scope.value.password);
      RegisterService.setStudentConfirm_password($scope.value.confirm_password);
      RegisterService.setStudentStreet($scope.value.street);
      RegisterService.setStudentCity($scope.value.City);
      RegisterService.setStudentZipcode($scope.value.ZipCode);
      RegisterService.setStudentRegion($scope.value.Region);
      RegisterService.setStudentCountry($scope.value.Country);
      RegisterService.setStudentPhonenumber($scope.value.PhoneNumber);

      RegisterService.register_Student();
    };

    $scope.enterprise_register = function(){

      console.log($scope.entprisevalue);
      RegisterService.setEnterpriseCompanyName($scope.entprisevalue.CompanyName);
      RegisterService.setEnterpriseContactPerson($scope.entprisevalue.ContactPerson);
      RegisterService.setEnterpriseEmail($scope.entprisevalue.Email);
      RegisterService.setEnterprisePassword($scope.entprisevalue.password);
      RegisterService.setEnterpriseConfirm_password($scope.entprisevalue.confirm_password);
      RegisterService.setEnterpriseStreet($scope.entprisevalue.street);
      RegisterService.setEnterpriseCity($scope.entprisevalue.City);
      RegisterService.setEnterpriseZipcode($scope.entprisevalue.ZipCode);
      RegisterService.setEnterpriseRegion($scope.entprisevalue.Region);
      RegisterService.setEnterpriseCountry($scope.entprisevalue.Country);
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

  .controller('filterCtrl', function ($scope,$http, $ionicPopover, JobService){
    initFilter();

      $http({method: 'GET', url: 'http://jobcenter-hftspws10.rhcloud.com/rest/util/getjobfield'})
        .success(function (result) {
          $scope.jobFields = result;
        })

    $http({method: 'GET', url: 'http://jobcenter-hftspws10.rhcloud.com/rest/util/getjobtype'})
      .success(function (result) {
        $scope.jobTypes = result;
      })

    $http({method: 'GET', url: 'http://jobcenter-hftspws10.rhcloud.com/rest/util/geteducationlevel'})
      .success(function (result) {
        $scope.jobEducationLevels = result;
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




