/**
 * Created by Patrick on 23.11.2015.
 */
angular.module('Workforce.services', [])
.factory('JobService' ,function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var testJobs = [{"id":2,"title":"Java","description":"Support of application operation, the ACTS platform and thus theÂ smooth settlement of payment transactions the Allianz Group. Participation in (international) projects for connecting additional units Alliance.","field":"Project_Management","location":"Stuttgart","minEducationLevel":"Bachelor of Science","minYearsOfExperience":1,"minSalary":44000,"maxSalary":46500,"startDate":"2016-01-02","applicationDeadline":"2016-11-01","timesOfVisits":3,"keySkills":["Profound knowledge in the development of mobile iOS (objective-c / Swift) and Android (Java) applications. Experience in agile development environment, conceptual skills and experience in SQL environment are now complete your profile"]},{"id":1,"title":"Mobile App Developer! Mobile Software-Developer (m/f)","description":"Responsible for mobile applications (Objective-C / Android) the company: design, development and optimization by agile principle. Realization of the frontend components with HTML / CSS / XML and SQL interfaces.","field":"Project_Management","location":"Stuttgart","minEducationLevel":"Bachelor of Science","minYearsOfExperience":3,"minSalary":47000,"maxSalary":48500,"startDate":"2016-01-15","applicationDeadline":"2015-12-13","timesOfVisits":23,"keySkills":["Basic knowledge of client / server development (eg Java)","Good communication skills in English both spoken and written","Joy of international cooperation"]}]
  var dataCache = [];
  var lastSearch = "";
  var dataPromise = null;

  return {

    search: function (keywords, location) {

      if (dataPromise == null || lastSearch != keywords + location ) {
        lastSearch = keywords + location;
        var locationEncoded = encodeURIComponent(location);
        var keywordsEncoded = encodeURIComponent(keywords);
        var url = "";
        if (keywords == "" && location == "") {
          url = "http://jobcenter-hftspws10.rhcloud.com/rest/jobs/";
        }
        else if (keywords == "") {
          url = "http://jobcenter-hftspws10.rhcloud.com/rest/jobs/location/" + locationEncoded;
        }
        else if (location == "") {
          url = "http://jobcenter-hftspws10.rhcloud.com/rest/jobs/keyword" + keywordsEncoded;
        }
        else {
          url = "http://jobcenter-hftspws10.rhcloud.com/rest/jobs/" + keywordsEncoded + "/" + locationEncoded;
        }

        dataPromise = $http({method:'GET', url: url})
         .success(function (result) {
         dataCache = result;
         return result;
         })
         .error(function () {
         return [];
         });

      }
      return dataPromise;
    },


    getDetails: function(jobId) {
      var returnValue =[]
        angular.forEach(dataCache, function(value, key){
          if(value.id == jobId)
          {
            returnValue = value;
          }
        });
      return returnValue;
    }
  };
});
