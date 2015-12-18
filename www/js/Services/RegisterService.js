/**
 * Created by Krupa on 12/5/2015.
 */

angular.module('Workforce.services')

.factory('RegisterService',function($http){

  var value = {};
  var enterprisevalue = {};
  var localPromise = null


  return{


    SetstudentFirstname : function(Firstname){
      value.FirstName = Firstname;
    },

    SetstudentLastname : function(Lastname){

      value.LastName = Lastname;
    },

    SetstudentBirthdate : function(birthdate){

      value.BirthDate = birthdate;
     var final_date = new Date(value.BirthDate);
      var yyyy = final_date.getFullYear();
      var mm = final_date.getMonth() < 9 ? "0" + (final_date.getMonth() + 1) : (final_date.getMonth() + 1);
      var dd  = final_date.getDate() < 10 ? "0" + final_date.getDate() : final_date.getDate();


      value.fin=yyyy+"-"+mm+"-"+dd;
      console.log(value.fin);
    },

    SetstudentGender : function(gender){
      value.Gender= gender;
    },
    SetstudentEmail : function(email){

      value.Email = email;
    },
    SetstudentPassword : function(password){
      value.password=password;


    },

    SetstudentConfirm_password : function(confirm_password){
      value.confirm_password=confirm_password;
    },

    SetstudentStreet: function (street) {
      value.street=street;

    },
    SetstudentCity : function(city){
      value.City=city;
    },
    SetstudentZipcode : function(zipcode){
      value.ZipCode=zipcode;
    },
    SetstudentRegion : function(region){

      value.Region=region;
    },
    SetstudentCountry : function(country){
    value.Country=country;

    },
    SetstudentPhonenumber : function(phnumber){
      value.PhoneNumber = phnumber;
    },

    //*********************************ENTERPRISE***********************************************************

    SetenterpriseCompanyname : function(companyname){
      enterprisevalue.CompanyName = companyname;
    },

    SetenterpriseIndustrytype : function(industrytype){
      enterprisevalue.IndustryType = industrytype;
    },

    SetenterpriseContactPerson : function(contactperson){
      enterprisevalue.ContactPerson = contactperson;
    },

    SetenterpriseEmail : function(email){

      enterprisevalue.Email = email;
    },

    SetenterprisePassword : function(password){
      enterprisevalue.password=password;
    },

    SetenterpriseConfirm_password : function(confirm_password){
      enterprisevalue.confirm_password=confirm_password;
    },

    SetenterpriseStreet: function (street) {
      enterprisevalue.street=street;

    },
    SetenterpriseCity : function(city){
      enterprisevalue.City=city;
    },
    SetenterpriseZipcode : function(zipcode){
      enterprisevalue.ZipCode=zipcode;
    },
    SetenterpriseRegion : function(region){

      enterprisevalue.Region=region;
    },

    SetenterpriseCountry : function(country){
      enterprisevalue.Country=country;

    },


    register_Student : function(){
      var url = "";

      url="http://jobcenter-hftspws10.rhcloud.com/rest/account/register/student/"

      if ( value.Region=="" && value.PhoneNumber=="") {
       // url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/register/student/"+value.FirstName+"/"+value.LastName+"/"+value.fin+"/"+value.Gender+"/"+value.Email+"/"+value.password+"/" +value.confirm_password+"/"+value.street+"/"+value.City+"/"+value.ZipCode+"/"+value.Country+"/";

          var  param_value= +value.FirstName+"/"+value.LastName+"/"+value.fin+"/"+value.Gender+"/"+value.Email+"/"+value.password+"/" +value.confirm_password+"/"+value.street+"/"+value.City+"/"+value.ZipCode+"/"+value.Country+"/"
        enc_url = encodeURIComponent(param_value)
        console.log(enc_url);
      }
      else if (value.Region == "") {
       // url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/register/student/"+value.FirstName+"/"+value.LastName+"/"+value.fin+"/"+value.Gender+"/"+value.Email+"/"+value.password+"/" +value.confirm_password+"/"+value.street+"/"+value.City+"/"+value.ZipCode+"/"+value.Country+"/"+PhoneNumber+"/"+value.PhoneNumber+"/";
        var  param_value=+value.FirstName+"/"+value.LastName+"/"+value.fin+"/"+value.Gender+"/"+value.Email+"/"+value.password+"/" +value.confirm_password+"/"+value.street+"/"+value.City+"/"+value.ZipCode+"/"+value.Country+"/"+PhoneNumber+"/"+value.PhoneNumber+"/"
        enc_url = encodeURIComponent(param_value)
        console.log(enc_url);
      }
      else if (value.PhoneNumber == "") {
        //url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/register/student/"+value.FirstName+"/"+value.LastName+"/"+value.fin+"/"+value.Gender+"/"+value.Email+"/"+value.password+"/" +value.confirm_password+"/"+value.street+"/"+value.City+"/"+value.ZipCode+"/"+Region+"/"+value.Region+"/"+value.Country+"/";
        var  param_value=+value.FirstName+"/"+value.LastName+"/"+value.fin+"/"+value.Gender+"/"+value.Email+"/"+value.password+"/" +value.confirm_password+"/"+value.street+"/"+value.City+"/"+value.ZipCode+"/"+Region+"/"+value.Region+"/"+value.Country+"/"
        enc_url = encodeURIComponent(param_value)
        console.log(enc_url);
      }
      else {
        //url = "http://jobcenter-hftspws10.rhcloud.com/rest/account/register/student/"+value.FirstName+"/"+value.LastName+"/"+value.fin+"/"+value.Gender+"/"+value.Email+"/"+value.password+"/" +value.confirm_password+"/"+value.street+"/"+value.City+"/"+value.ZipCode+"/"+value.Region+"/"+value.Country+"/"+value.PhoneNumber+"/";
        var  param_value=+value.FirstName+"/"+value.LastName+"/"+value.fin+"/"+value.Gender+"/"+value.Email+"/"+value.password+"/" +value.confirm_password+"/"+value.street+"/"+value.City+"/"+value.ZipCode+"/"+value.Region+"/"+value.Country+"/"+value.PhoneNumber+"/"
        enc_url = encodeURIComponent(param_value)
        console.log(enc_url);
      }

      localPromise = $http({
                      method: 'POST',
                      url: url,
                      headers: {'Content_Type': 'application/x-www-form-urlencoded'},
                      data : enc_url
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

      if (enterprisevalue.Region == "") {
        var  param_ent=+enterprisevalue.CompanyName+"/"+enterprisevalue.IndustryType+"/"+enterprisevalue.ContactPerson+"/"+enterprisevalue.Email+"/"+enterprisevalue.password+"/" +enterprisevalue.confirm_password+"/"+enterprisevalue.street+"/"+enterprisevalue.City+"/"+ZipCode+"/"+enterprisevalue.ZipCode+"/"+enterprisevalue.Country+"/"
        enc_enturl = encodeURIComponent(param_ent)
        console.log(enc_enturl);
      }
      else {
        var  param_ent=+enterprisevalue.CompanyName+"/"+enterprisevalue.IndustryType+"/"+enterprisevalue.ContactPerson+"/"+enterprisevalue.Email+"/"+enterprisevalue.password+"/" +enterprisevalue.confirm_password+"/"+enterprisevalue.street+"/"+enterprisevalue.City+"/"+enterprisevalue.ZipCode+"/"+enterprisevalue.Region+"/"+enterprisevalue.Country+"/"
        enc_enturl = encodeURIComponent(param_ent)
        console.log(enc_enturl);
      }

      localPromise = $http({
        method: 'POST',
        url: url,
        headers: {'Content_Type': 'application/x-www-form-urlencoded'},
        data : enc_enturl
      })
        .success(function (result) {

          console.log("successful register")

        })
        .error(function () {
          console.log("there is error in the loading")
        });



    }
  }


});
