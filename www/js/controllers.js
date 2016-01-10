angular.module('Workforce.controllers', [])
  .controller('loginCtrl', function ($scope, LoginService, $state, $rootScope, ApplicationService, BookmarkService) {
    $scope.data = {};
    $scope.login = function () {

      LoginService.loginUser($scope.data.Email, $scope.data.password).then(function (data) {
        ApplicationService.loadApplications();
        BookmarkService.loadBookmarks();
        $state.go('welcome',{},{reload:true});
      },function(data) {

        var alertPopup = $ionicPopup.alert({
          title: 'Wrong Credentials!',
          template: 'Username or Password is incorrect'
        });
        alertPopup.then(function(res) {
          console.log('invalid credentials');
        });


      });

    };




    $scope.logout = function () {
      console.log('This is the login function')
      LoginService.logoutUser();
      $scope.SetUsername = null;
      $state.go('welcome', {}, {reload: true})
      $rootScope.apply();
      ApplicationService.resetInitilized();
      BookmarkService.resetInitilized();
    }


  })

  .controller('welcomeCtrl', function ($scope, $state, LoginService, JobService) {
    $scope.keywords = JobService.getFilterKeywords();
    $scope.location = JobService.getFilterLocation();
    $scope.username = LoginService.getUser();
    $scope.isEnterprise = LoginService.isEnterprise();

    $scope.search = function () {
      JobService.setFilterKeywords(this.keywords);
      JobService.setFilterLocation(this.location);
      JobService.loadJobOffers();
      $state.go('searchResults', {}, {reload: true});
    }
  })

  .controller('registerCtrl', function ($scope, $http, RegisterService, $state) {

    $scope.value = {};
    $scope.entprisevalue = {};
    $scope.pwOK = false;
    $scope.compare_student = false;
    $scope.compare_enterprise = false


    $scope.Student_Register = function () {

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

      RegisterService.register_Student().then(function(result){
        var value = result
        var status= value.persistenceStatus
        console.log(status)
        if(status == "false"){
          var alertPopup = $ionicPopup.alert({
            title: 'Email already registered!',
            template: 'Please enter the valid/new email id'

          });
          alertPopup.then(function(res) {

          });

        }
        else {
          var alertPopup = $ionicPopup.alert({
            title: 'Registration Successful!',
            template: 'You may login now'
          });

          $state.go('login',{},{reload:true})

          alertPopup.then(function(res) {


          });
        }
      },function(error){
        console.log('unsuccessful registration')
        var alertPopup = $ionicPopup.alert({
          title: 'Email Id already registered!',
          template: 'Please enter the new email id'
        });
        alertPopup.then(function(res) {

        });
      })
    };

    $scope.enterprise_register = function () {

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

    $scope.checkPassword = function () {
      if ($scope.Student_Register) {
        $scope.compare_student = angular.equals($scope.value.password, $scope.value.confirm_password);
        if($scope.compare_student==false){


        }
      }
      if ($scope.enterprise_register) {
        $scope.compare_enterprise = angular.equals($scope.entprisevalue.password, $scope.entprisevalue.confirm_password);
      }
    }
  })

  .controller('filterCtrl', function ($scope, $http, $ionicPopover, JobService) {
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
    }).then(function (popover) {
      $scope.popoverField = popover;
    });
    $ionicPopover.fromTemplateUrl('popover-type.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popoverType = popover;
    });
    $ionicPopover.fromTemplateUrl('popover-education.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popoverEducation = popover;
    });

    $scope.openPopoverField = function ($event) {
      $scope.popoverField.show($event);
    };
    $scope.closePopoverField = function () {
      $scope.popoverField.hide();
    };
    $scope.openPopoverType = function ($event) {
      $scope.popoverType.show($event);
    };
    $scope.closePopoverType = function () {
      $scope.popoverType.hide();
    };
    $scope.openPopoverEducation = function ($event) {
      $scope.popoverEducation.show($event);
    };
    $scope.closePopoverEducation = function () {
      $scope.popoverEducation.hide();
    };

    $scope.applyFilter = function (filter) {
      JobService.setFilterEducation(filter.education);
      JobService.setFilterSalary(filter.salary);
      JobService.setFilterExperience(filter.experience);
      JobService.setFilterField(filter.field);
      JobService.setFilterType(filter.type);
      JobService.setFilterKeywords(filter.keywords);
      JobService.setFilterLocation(filter.location);
      JobService.loadJobOffers();
    }

    $scope.resetFilter = function () {
      JobService.setFilterEducation("");
      JobService.setFilterSalary(0);
      JobService.setFilterExperience(0);
      JobService.setFilterField("");
      JobService.setFilterType("");
      JobService.loadJobOffers();
      initFilter();
    }

    function initFilter() {
      $scope.filter = {};
      $scope.filter.salary = JobService.getFilterSalary();
      $scope.filter.experience = JobService.getFilterExperience();
      $scope.filter.field = JobService.getFilterField();
      $scope.filter.type = JobService.getFilterType();
      $scope.filter.education = JobService.getFilterEducation();
      $scope.filter.keywords = JobService.getFilterKeywords();
      $scope.filter.location = JobService.getFilterLocation();
    }
  })

  .controller('searchResultsCtrl', function ($scope, $ionicSideMenuDelegate, JobService) {

    $scope.dragContent = false; // enables scrolling on left side (filter)
    $scope.JobOffers = JobService.getJobOffers();
    $scope.isLoading = JobService.isLoading();

    $scope.$on('jobListChanged', function () {
      $scope.JobOffers = JobService.getJobOffers();
    });

    $scope.$on('loadingStateChanged', function () {
      $scope.isLoading = JobService.isLoading();
    });

    $scope.toggleLeft = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
  })

  .controller('jobDetailsCtrl', function ($scope, $stateParams, JobService, LoginService, ApplicationService, BookmarkService) {
    $scope.job = JobService.getJobDetails($stateParams.jobId);
    $scope.isLoggedIn = LoginService.getUser() != "";
    $scope.isBookmarked = BookmarkService.isBookmarked($stateParams.jobId);
    $scope.isApplied = ApplicationService.isApplied($stateParams.jobId);

    $scope.bookmark = function () {
      BookmarkService.doBookmark($stateParams.jobId);
    }
    $scope.removeBookmark = function () {
      BookmarkService.removeBookmark($stateParams.jobId);
    }

    $scope.cancelApplication = function()
    {
      ApplicationService.cancelApplication($stateParams.jobId);
    }

    $scope.apply = function () {
      ApplicationService.doApply($stateParams.jobId);
    }

    $scope.$on('applicationListChanged', function () {
      $scope.isApplied = ApplicationService.isApplied($stateParams.jobId);
    });

    $scope.$on('bookmarkListChanged', function () {
      $scope.isBookmarked = BookmarkService.isBookmarked($stateParams.jobId);
    });
  })

  .controller('applicationsCtrl', function ($scope, ApplicationService) {
    $scope.applications = ApplicationService.getApplications();
    $scope.isLoading = true;
    ApplicationService.loadApplications();

    $scope.doRefresh = function () {
      ApplicationService.loadApplications();
    }

    $scope.$on('applicationListChanged', function () {
      $scope.applications = ApplicationService.getApplications();
      $scope.$broadcast('scroll.refreshComplete');
    });

    $scope.$on('loadingStateChanged', function () {
      $scope.isLoading = ApplicationService.isLoading();
    });
  })

  .controller('bookmarksCtrl', function ($scope, BookmarkService) {
    $scope.bookmarks = BookmarkService.getBookmarks();
    $scope.isLoading = true;
    BookmarkService.loadBookmarks();

    $scope.doRefresh = function () {
      BookmarkService.loadBookmarks();
    }

    $scope.$on('bookmarkListChanged', function () {
      $scope.bookmarks = BookmarkService.getBookmarks();
      $scope.$broadcast('scroll.refreshComplete');
    });

    $scope.$on('loadingStateChanged', function () {
      $scope.isLoading = BookmarkService.isLoading();
    });
  })

  .controller('offersCtrl', function ($scope, LoginService, BookmarkService) {
    $scope.offers = {};
    BookmarkService.getBookmarks(LoginService.getUser()).then(function (result) {
      $scope.offers = result.data;
    });
  })




