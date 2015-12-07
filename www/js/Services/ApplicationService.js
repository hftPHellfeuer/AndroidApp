/**
 * Created by Krupa on 12/6/2015.
 */

angular.module('Workforce.services')

.factory('ApplicationService', function($http, JobService) {

  return{
    getApplications : function(Username){
      return JobService.search("", "Stuttgart");
    }
  }

})
