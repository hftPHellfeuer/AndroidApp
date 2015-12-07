/**
 * Created by Krupa on 12/6/2015.
 */

angular.module('Workforce.services')

.factory('ApplicationService', function($http) {

  return{


    getApplications : function(Username){

      console.log(Username);
    }
  }

})
