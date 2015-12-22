/**
 * Created by Patrick on 23.11.2015.
 */
angular.module('Workforce.services', [])
  .factory('JobService', function ($http, $rootScope) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var testJobs = [{
      "id": 2,
      "title": "Java",
      "description": "Support of application operation, the ACTS platform and thus theÂ smooth settlement of payment transactions the Allianz Group. Participation in (international) projects for connecting additional units Alliance.",
      "field": "Project_Management",
      "location": "Stuttgart",
      "minEducationLevel": "Bachelor of Science",
      "minYearsOfExperience": 1,
      "minSalary": 44000,
      "maxSalary": 46500,
      "startDate": "2016-01-02",
      "applicationDeadline": "2016-11-01",
      "timesOfVisits": 3,
      "keySkills": ["Profound knowledge in the development of mobile iOS (objective-c / Swift) and Android (Java) applications. Experience in agile development environment, conceptual skills and experience in SQL environment are now complete your profile"]
    }, {
      "id": 1,
      "title": "Mobile App Developer! Mobile Software-Developer (m/f)",
      "description": "Responsible for mobile applications (Objective-C / Android) the company: design, development and optimization by agile principle. Realization of the frontend components with HTML / CSS / XML and SQL interfaces.",
      "field": "Project_Management",
      "location": "Stuttgart",
      "minEducationLevel": "Bachelor of Science",
      "minYearsOfExperience": 3,
      "minSalary": 47000,
      "maxSalary": 48500,
      "startDate": "2016-01-15",
      "applicationDeadline": "2015-12-13",
      "timesOfVisits": 23,
      "keySkills": ["Basic knowledge of client / server development (eg Java)", "Good communication skills in English both spoken and written", "Joy of international cooperation"]
    }]
    var dataCache = [];
    var isLoading = false;
    var filteredJobs = [];
    var localPromise = null;
    var searchChanged = true; // indicates that location or keywords changed --> new HTTP Get needed
    var filter = {};
    filter.salary = 0;
    filter.experience = 0;
    filter.field = "";
    filter.type = "";
    filter.education = "";
    filter.keywords = "";
    filter.location = "";

    // public funtions
    return {

      isLoading: function()
      {
        return isLoading;
      },

      getJobOffers: function ()
      {
        return filteredJobs;
      },

      getJobDetails: function (jobId) {
        var returnValue = []
        angular.forEach(filteredJobs, function (value, key) {
          if (value.id == jobId) {
            returnValue = value;
          }
        });
        return returnValue;
      },

      update: function () {
        if (searchChanged) {
          isLoading = true;
          $rootScope.$broadcast("loadingStateChanged");
          var locationEncoded = encodeURIComponent(filter.location);
          var keywordsEncoded = encodeURIComponent(filter.keywords);
          var url = "";
          if (filter.keywords == "" && filter.location == "") {
            url = "http://jobcenter-hftspws10.rhcloud.com/rest/jobs/";
          }
          else if (filter.keywords == "") {
            url = "http://jobcenter-hftspws10.rhcloud.com/rest/jobs/location/" + locationEncoded;
          }
          else if (filter.location == "") {
            url = "http://jobcenter-hftspws10.rhcloud.com/rest/jobs/keyword" + keywordsEncoded;
          }
          else {
            url = "http://jobcenter-hftspws10.rhcloud.com/rest/jobs/" + keywordsEncoded + "/" + locationEncoded;
          }

          localPromise = $http({method: 'GET', url: url})
            .success(function (result) {
              dataCache = [];
              angular.forEach(result, function (value, key) {

                var temp = value;
                temp.field = temp.field.replace("_", " ");
                temp.jobType = temp.jobType.replace("_", " ");
                temp.education = temp.education.replace("_", " ");
                dataCache.push(temp);
              })
              filteredJobs = filterResults();
              isLoading = false;
              $rootScope.$broadcast("jobListChanged");
              $rootScope.$broadcast("loadingStateChanged");
            })
            .error(function () {
            });

        }else{
          filteredJobs = filterResults();
        }
      },





      // Setter for Filter
      setFilterKeywords: function (keywords) {
        if (keywords != filter.keywords) {
          filter.keywords = keywords;
          searchChanged = true;
        }
      },

      setFilterLocation: function (location) {
        if (location != filter.location) {
          filter.location = location;
          searchChanged = true;
        }
      },

      setFilterSalary: function (salary) {
        filter.salary = salary;
      },

      setFilterExperience: function (experience) {
        filter.experience = experience;
      },

      setFilterField: function (field) {
        filter.field = field;
      },

      setFilterType: function (type) {
        filter.type = type;
      },

      setFilterEducation: function (education) {
        filter.education = education;
      },


      // Getter for Filter
      getFilterKeywords: function () {
        return filter.keywords;
      },

      getFilterLocation: function () {
        return filter.location;
      },

      getFilterSalary: function () {
        return filter.salary;
      },

      getFilterExperience: function () {
        return filter.experience;
      },

      getFilterField: function () {
        return filter.field;
      },

      getFilterType: function () {
        return filter.type;
      },

      getFilterEducation: function () {
        return filter.education;
      }

    };

    // private functions
    function filterResults() {
      var filtered = dataCache;
      if (filter.field != "") {
        filtered = filtered.filter(function (job) {
          return job.field.replace("_", " ") == filter.field
        });
      }
      if (filter.type != "") {
        filtered = filtered.filter(function (job) {
          return job.jobType.replace("_", " ") == filter.type
        });
      }
      if (filter.education != "") {
        filtered = filtered.filter(function (job) {
          return job.education.replace("_", " ") == filter.education
        });
      }
      if (filter.salary != 0) {
        filtered = filtered.filter(function (job) {
          return job.minSalary >= filter.salary;
        });
      }
      if (filter.experience != 0) {
        filtered = filtered.filter(function (job) {
          return job.minYearsOfExperience >= filter.experience;
        });
      }
      return filtered;
    }
  })
