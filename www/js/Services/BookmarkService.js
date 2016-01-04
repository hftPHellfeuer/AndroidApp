/**
 * Created by Patrick on 07.12.2015.
 */
angular.module('Workforce.services')

  .factory('BookmarkService', function($http,$rootScope,  LoginService, JobService) {

    var bookmarkCache = [];
    var isLoading = false;

    return{
      isLoading: function()
      {
        return isLoading;
      },

      loadBookmarks : function() {
        var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/getbookmarks/" + LoginService.getUser() +
          "/" + LoginService.getPW() + "/";
        isLoading = true;

        $http({method: 'GET', url: url})
          .success(function (result) {
            var allBookmarks = [];
            angular.forEach(result, function (value, key) {
              var temp = value.job;
              temp.field = temp.field.replace("_", " ");
              temp.jobType = temp.jobType.replace("_", " ");
              temp.education = temp.education.replace("_", " ");
              allBookmarks.push(temp);
            })
            bookmarkCache = allBookmarks;
            JobService.setJobOffers(allBookmarks);
            $rootScope.$broadcast("bookmarkListChanged");
            isLoading = false;
            $rootScope.$broadcast("loadingStateChanged");
          })
      },

      getBookmarks: function()
      {
        return bookmarkCache;
      },

    }

  })
