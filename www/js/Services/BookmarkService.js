/**
 * Created by Patrick on 07.12.2015.
 */
angular.module('Workforce.services')

  .factory('BookmarkService', function($http, JobService) {

    return{
      getBookmarks : function(Username){
        return JobService.search("", "Stuttgart");
      }
    }

  })
