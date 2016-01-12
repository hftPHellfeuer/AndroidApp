/**
 * Created by Krupa on 11/28/2015.
 */


angular.module('Workforce.services')

  .factory ('LoginService',function($q,$http,$ionicPopup,$rootScope,md5Encryption) {
    var token = ''; //  Here we will have a unique session id which wil be obtained from rest api
    var username = '';
    var detail = [];
    var accountType= ''; // indicates if the user is a student, enterprise or admin
    var passwordEnc = '';// cached password md5 encrypted
    var password = ''; //cached password in plain text


      function destroyUser() { // removes all the credentials details
          token = '';
          username = '';
          accountType = '';
          passwordEnc = '';
          window.localStorage.removeItem('WorkForceUserMail');
          window.localStorage.removeItem('WorkForceUserPW');
          $rootScope.$broadcast("logInStateChanged");
      }


      return {
      getUser: function (){
        return username;
      },

      isEnterprise: function()
      {
        return accountType == 'Enterprise';
      },

      getPW: function()
      {
        return password;
      },


      loginUser: function (email, pw) {
        var deferred = $q.defer();

        password = pw;
        var enc_pw = md5Encryption.getHash(pw);
        console.log(enc_pw)

        var url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/login/" + email + "/" + pw;
        console.log(url);

         $http({method: 'GET', url: url}).success(function (result){
             detail = result;
             if (email == detail.email && enc_pw == detail.password) {
                 deferred.resolve('Welcome ' + email + '!');
                 username = email;
                 accountType = result.accountType;
                 passwordEnc = result.password;
                 window.localStorage['WorkForceUserMail'] = email;
                 window.localStorage['WorkForceUserPW'] = password;
                 $rootScope.$broadcast("logInStateChanged");

                 deferred.promise.success = function (fn) {
                     promise.then(fn);
                     return promise;
                 }
           } else {
             console.log('wrong credentials')
             deferred.reject('Wrong credentials.');
             result = false;

             deferred.promise.error = function (fn) {
               promise.then(null, fn);
               return promise;
             }
           }
        }).error(function () {
             var alertPopup = $ionicPopup.alert({
                 title: 'Error!',
                 template: 'Can not reach the Server'
             });

             });
        return deferred.promise;

      },

      logoutUser: function () {
        console.log("this is the logout user function")
        destroyUser();
      }

    }
  })

