/**
 * Created by Krupa on 12/6/2015.
 */

angular.module('Workforce.services')

.factory('ApplicationService', function($http, $rootScope, LoginService, JobService) {

  var applicationCache = []; // for caching the response from the Server
  var isLoading = false; // indicates if a HttpRequest is going on

  return{
    isLoading: function()
    {
      return isLoading;
    },

    clearCache:function()
    {
      applicationCache= [];
      JobService.setApplications([]);
    },

    loadApplications : function() {
      doLoadApplications();
    },

    getApplications: function()
    {
      return applicationCache;
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
          doLoadApplications();
        })
    },

    cancelApplication: function(jobId)
    {
      var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/deleteapplication/" + LoginService.getUser() +
        "/" + LoginService.getPW() + "/" + jobId;
      $http({method: 'GET', url: url})
        .success(function (result) {
          doLoadApplications();
        })
    }

  }

  function doLoadApplications()
  {
    var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/getapplications/" + LoginService.getUser() +
      "/" + LoginService.getPW() + "/";
    isLoading = true;

    $http({method: 'GET', url: url})
      .success(function (result) {
        var allApplications = [];
        // remove underscores from Enum fields
        if (result.status != "The user has no applications!") {
          angular.forEach(result, function (value, key) {
            var temp = value.job;
            temp.applicationStatus = value.status;
            temp.field = temp.field.replace("_", " ");
            temp.jobType = temp.jobType.replace("_", " ");
            temp.education = temp.education.replace("_", " ");
            temp.isApplied = true;
            allApplications.push(temp);
          })
        }
        applicationCache = allApplications;
        //update Jobs in JobService with application information
        JobService.setApplications(allApplications);

        //update GUI
        $rootScope.$broadcast("applicationListChanged");
        isLoading = false;
        $rootScope.$broadcast("loadingStateChanged");
      })
  }


})
