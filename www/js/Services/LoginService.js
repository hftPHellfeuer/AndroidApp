/**
 * Created by Krupa on 11/28/2015.
 */

angular.module('Workforce.services')
  .factory ('LoginService',function($q) {
    var isAuth = false;
    var token = ''; //  Here we will have a unique session id which wil be obtained from rest api
    var result = false;
    var username = '';


    function destroyUser() { // removes all the credentials details
      isAuth = false;
      token = '';
      username = '';

    }


    return {
      getUser: function (){
        return username;
      },

      loginUser: function (email, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;


        if (email == 'user@gmail.com' && pw == 'secret') {
          deferred.resolve('Welcome ' + email + '!');
          token = 'TT';
          isAuth = true;
          result = true;
          username = email;


        } else {
          deferred.reject('Wrong credentials.');
          result = false;
        }
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      },

      logoutUser: function () {
        console.log("this is the logout user function")
        destroyUser();

      }

    }
  })

