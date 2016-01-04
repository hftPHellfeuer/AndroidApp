/**
 * Created by Krupa on 12/6/2015.
 */

angular.module('Workforce.services')

.factory('ApplicationService', function($http, $rootScope, LoginService, JobService) {

  var applicationCache = [];
  var isLoading = false;
  var initialized = false;

  return{
    isLoading: function()
    {
      return isLoading;
    },

    loadApplications : function() {
      var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/getapplications/" + LoginService.getUser() +
        "/" + LoginService.getPW() + "/";
      isLoading = true;

      $http({method: 'GET', url: url})
        .success(function (result) {
          var allApplications = [];
          angular.forEach(result, function (value, key) {
            var temp = value.job;
            temp.applicationStatus = value.status;
            temp.field = temp.field.replace("_", " ");
            temp.jobType = temp.jobType.replace("_", " ");
            temp.education = temp.education.replace("_", " ");
            allApplications.push(temp);
          })
          applicationCache = allApplications;
          JobService.setJobOffers(allApplications);
          $rootScope.$broadcast("applicationListChanged");
          isLoading = false;
          $rootScope.$broadcast("loadingStateChanged");
          initialized= true;
        })
    },

    getApplications: function()
    {
      return applicationCache;
    },

    isInitialized: function()
    {
      return initialized;
    },

    resetInitialized:function()
    {
      initialized= false;
    },

    isApplied: function (jobId)
    {
      var returnValue = false;
      angular.forEach(applicationCache, function (value, key) {
        if (value.id == jobId) {
          returnValue = true;
        }
      });
      return returnValue;
    },

    doApply: function(jobId)
    {
      var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/applyforjob/" + LoginService.getUser() +
        "/" + LoginService.getPW() + "/" + jobId;
      $http({method: 'GET', url: url})
        .success(function (result) {

        })
    }

  }



})
