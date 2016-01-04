/**
 * Created by Patrick on 23.11.2015.
 */
angular.module('Workforce.services', [])
  .factory('JobService', function ($http, $rootScope, LoginService) {

    var jobOfferCache = [];
    var filteredJobs = [];

    var isLoading = false;

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

      setJobOffers: function (offers)
      {
        jobOfferCache = offers;
        searchChanged = true;
      },

      getJobOffers: function ()
      {
        return filteredJobs;
      },

      getJobDetails: function (jobId) {
        var returnValue = []
        angular.forEach(jobOfferCache, function (value, key) {
          if (value.id == jobId) {
            returnValue = value;
          }
        });
        return returnValue;
      },

      loadJobOffers: function () {
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

          $http({method: 'GET', url: url})
            .success(function (result) {
              jobOfferCache = [];
              angular.forEach(result, function (value, key) {

                var temp = value;
                temp.field = temp.field.replace("_", " ");
                temp.jobType = temp.jobType.replace("_", " ");
                temp.education = temp.education.replace("_", " ");
                jobOfferCache.push(temp);
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
      var filtered = jobOfferCache;
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
