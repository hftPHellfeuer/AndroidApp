/**
 * Created by Patrick on 07.12.2015.
 */
angular.module('Workforce.services')

  .factory('BookmarkService', function($http,$rootScope,  LoginService, JobService) {

    var bookmarkCache = []; // for caching the response from the Server
    var isLoading = false; // indicates if a HttpRequest is going on

    return{
      isLoading: function()
      {
        return isLoading;
      },

      clearCache:function()
      {
        bookmarkCache= [];
        JobService.setBookmarks([]);
      },

      loadBookmarks : function() {
        doLoadBookmarks();
      },

      getBookmarks: function()
      {
        return bookmarkCache;
      },

      isBookmarked: function (jobId)
      {
        var returnValue = false;
        angular.forEach(bookmarkCache, function (value, key) {
          if (value.id == jobId) {
           returnValue = true;
          }
        });
        return returnValue;
      },

      doBookmark: function(jobId)
      {
        var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/bookmarkjob/" + LoginService.getUser() +
          "/" + LoginService.getPW() + "/" + jobId;
        $http({method: 'GET', url: url})
          .success(function (result) {
            doLoadBookmarks();
          })

      },

      removeBookmark: function (jobId) {
          var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/deletebookmark/" + LoginService.getUser() +
            "/" + LoginService.getPW() + "/" + jobId;
        $http({method: 'GET', url: url})
          .success(function (result) {
            doLoadBookmarks();
          })
      }
    }

    function doLoadBookmarks()
    {
      var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/getbookmarks/" + LoginService.getUser() +
        "/" + LoginService.getPW() + "/";
      isLoading = true;

      $http({method: 'GET', url: url})
        .success(function (result) {
          var allBookmarks = [];
          // remove underscores from Enum fields

            if (result.status != "The user has no bookmarks!") {
                angular.forEach(result, function (value, key) {
                    var temp = value.job;
                    temp.field = temp.field.replace("_", " ");
                    temp.jobType = temp.jobType.replace("_", " ");
                    temp.education = temp.education.replace("_", " ");
                    temp.isBookmarked = true;
                    allBookmarks.push(temp);
                })
            }
            // update Jobs in JobService with bookmark information
            bookmarkCache = allBookmarks;
          JobService.setBookmarks(allBookmarks);

          // update GUI
          $rootScope.$broadcast("bookmarkListChanged");
          isLoading = false;
          $rootScope.$broadcast("loadingStateChanged");
        })
    }

  })
