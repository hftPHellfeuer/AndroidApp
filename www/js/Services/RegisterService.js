/**
 * Created by Krupa on 12/5/2015.
 */

angular.module('Workforce.services')

.factory('RegisterService',function($http,md5Encryption){

  var value = {};
  var enterprisevalue = {};
  var localPromise = null


  return{


    setStudentFirstname : function(Firstname){
      value.FirstName = Firstname;
    },

    setStudentLastname : function(Lastname){

      value.LastName = Lastname;
    },

    setStudentBirthdate : function(birthdate){

      value.BirthDate = birthdate;
     var final_date = new Date(value.BirthDate);
      var yyyy = final_date.getFullYear();
      var mm = final_date.getMonth() < 9 ? "0" + (final_date.getMonth() + 1) : (final_date.getMonth() + 1);
      var dd  = final_date.getDate() < 10 ? "0" + final_date.getDate() : final_date.getDate();


      value.fin=yyyy+"-"+mm+"-"+dd;
      console.log(value.fin);
    },

    setStudentGender : function(gender){
      value.Gender= gender;
    },
    setStudentEmail : function (email){

      value.Email = email;
    },
    setStudentPassword : function (password){
      value.password=password;


    },

    setStudentConfirm_password : function (confirm_password){
      value.confirm_password=confirm_password;

    },

    setStudentStreet: function (street) {
      value.street=street;

    },
    setStudentCity : function (city){
      value.City=city;
    },
    setStudentZipcode : function (zipcode){
      value.ZipCode=zipcode;
    },
    setStudentRegion : function (region){
     if (region!= ""){
       value.Region=region;
     }
      else {
       value.Region="";
     }

    },
    setStudentCountry : function (country){
    value.Country=country;

    },
    setStudentPhonenumber : function (phnumber){
      if(phnumber!=""){
        value.PhoneNumber = phnumber;
      }
      else {
        value.PhoneNumber ="";
      }

    },

    //*********************************ENTERPRISE***********************************************************

    setEnterpriseCompanyName : function (companyname){
      enterprisevalue.CompanyName = companyname;
    },

    setEnterpriseContactPerson : function (contactperson){
      enterprisevalue.ContactPerson = contactperson;
    },

    setEnterpriseEmail : function (email){

      enterprisevalue.Email = email;
    },

    setEnterprisePassword : function (password){
      enterprisevalue.password=password;
    },

    setEnterpriseConfirm_password : function (confirm_password){
      enterprisevalue.confirm_password=confirm_password;
    },

    setEnterpriseStreet: function (street) {
      enterprisevalue.street=street;

    },
    setEnterpriseCity : function (city){
      enterprisevalue.City=city;
    },
    setEnterpriseZipcode : function (zipcode){
      enterprisevalue.ZipCode=zipcode;
    },
    setEnterpriseRegion : function (region){
     if (region != ""){
       enterprisevalue.Region=region;
     }
      else {
       enterprisevalue.Region="";
     }

    },
    setEnterpriseCountry : function (country){
      enterprisevalue.Country=country;

    },


    register_Student : function(){
      var url = "";

      url="http://jobcenter-hftspws10.rhcloud.com/rest/account/register/student/"
      var Fname = encodeURIComponent(value.FirstName);
      var Lname = encodeURIComponent(value.LastName);
      var Finaltime = encodeURIComponent(value.fin);
      var Gender = encodeURIComponent(value.Gender);
      var email = encodeURIComponent(value.Email)
      var street = encodeURIComponent(value.street);
      var city = encodeURIComponent(value.City);
      var zipcode = encodeURIComponent(value.ZipCode);
      var region = encodeURIComponent(value.Region);
      var country = encodeURIComponent(value.Country);
      var phonenumber = encodeURIComponent(value.PhoneNumber)

      var enc_pass =md5Encryption.getHash(value.password);


      if ( region=="" && phonenumber=="") {
        var  param_value= Fname+"/"+Lname+"/"+Finaltime+"/"+Gender+"/"+email+"/"+enc_pass+"/"+street+"/"+city+"/"+zipcode+"/"+country+"/"

      }
      else if (region == "") {

        var  param_value=Fname+"/"+Lname+"/"+Finaltime+"/"+Gender+"/"+email+"/"+enc_pass+"/"+street+"/"+city+"/"+zipcode+"/"+country+"/"+phonenumber+"/"+phonenumber+"/"

      }
      else if (phonenumber == "") {

        var  param_value=Fname+"/"+Lname+"/"+Finaltime+"/"+Gender+"/"+email+"/"+enc_pass+"/"+street+"/"+city+"/"+zipcode+"/"+region+"/"+region+"/"+country+"/"

      }
      else {

        var  param_value=Fname+"/"+Lname+"/"+Finaltime+"/"+Gender+"/"+email+"/"+enc_pass+"/"+street+"/"+city+"/"+zipcode+"/"+region+"/"+country+"/"+phonenumber+"/"

      }
var final =  url + param_value;
      console.log(final)
      localPromise = $http({
                      method: 'GET',
                      url: final
      })
        .success(function (result) {

          console.log("successful register")

        })
        .error(function () {
          console.log("there is error in the loading")
        });




    },


    register_Enterprise : function(){


      var url = "";

      url="http://jobcenter-hftspws10.rhcloud.com/rest/account/register/enterprise/"

      var Companyname = encodeURIComponent(enterprisevalue.CompanyName);

      var Contactperson = encodeURIComponent(enterprisevalue.ContactPerson);

      var email = encodeURIComponent(enterprisevalue.Email)

      var street = encodeURIComponent(enterprisevalue.street);

      var city = encodeURIComponent(enterprisevalue.City);

      var zipcode = encodeURIComponent(enterprisevalue.ZipCode);

      var region = encodeURIComponent(enterprisevalue.Region);

      var country = encodeURIComponent(enterprisevalue.Country);


      var enc_pass =md5Encryption.getHash(enterprisevalue.password);





      if (region == "") {
        var  param_ent=Companyname+"/"+Contactperson+"/"+email+"/"+enc_pass+"/"+street+"/"+city+"/"+zipcode+"/"+zipcode+"/"+country+"/"

      }
      else {
        var  param_ent=Companyname+"/"+Contactperson+"/"+email+"/"+enc_pass+"/"+street+"/"+city+"/"+zipcode+"/"+region+"/"+country+"/"

      }


      var final =  url + param_ent;
      console.log(Companyname)
      console.log(final)


      localPromise = $http({
        method: 'GET',
        url: final,

      })
        .success(function (result) {

          console.log("successful Enterprise register")

        })
        .error(function () {
          console.log("there is error in the loading")
        });



    }
  }


});
