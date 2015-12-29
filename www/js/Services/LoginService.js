/**
 * Created by Krupa on 11/28/2015.
 */


angular.module('Workforce.services')

  .factory ('LoginService',function($q,$http,md5Encryption) {
    var isAuth = false;
    var token = ''; //  Here we will have a unique session id which wil be obtained from rest api
    var result = false;
    var username = '';
    var detail = [];



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


        var enc_pw = md5Encryption.getHash(pw);
        console.log(enc_pw)

        var url = "http://cors.io/?u=http://jobcenter-hftspws10.rhcloud.com/rest/account/login/" + email + "/" + pw;
        console.log(url);

         $http({method: 'GET', url: url}).success(function (result){
             detail = result;
           if (email == detail.email && enc_pw == detail.password) {
             deferred.resolve('Welcome ' + email + '!');
             token = detail.id;
             isAuth = true;
             username = email;

             console.log("This is the token"+token)
           }else {
             deferred.reject('Wrong credentials.');
             result = false;
           }

           deferred.promise.success = function(fn) {
             promise.then(fn);
             return promise;
           }
           deferred.promise.error = function(fn) {
             promise.then(null, fn);
             return promise;
           }
        });
        return deferred.promise;

      },

      logoutUser: function () {
        console.log("this is the logout user function")
        destroyUser();

      }

    }
  })

