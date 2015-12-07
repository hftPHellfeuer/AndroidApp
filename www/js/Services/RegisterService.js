/**
 * Created by Krupa on 12/5/2015.
 */

angular.module('Workforce.services')

.factory('RegisterService',function(){

  return{

    register_Student : function(value){

      console.log('This is the student register service '+value);
    },


    register_Enterprise : function(enterprisevalue){

      console.log('this is the enterprise register service'+enterprisevalue)
    }
  }


});
