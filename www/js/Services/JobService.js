/**
 * Created by Patrick on 23.11.2015.
 */
angular.module('Workforce.services', [])
  .factory('JobService', function ($http, $rootScope) {

    // Cache for different sets of job offers
    var jobOfferCache = []; // all offers for keywords and location
    var applicationCache = []; // all applications - set and updated by ApplicationService
    var bookmarkCache = []; // all boookmarks - set and updated by BookmarkService
    var filteredJobs = []; // all offers left after filtering

    var isLoading = false; // indicates if a httpRequest is running
    var searchChanged = true; // indicates that location or keywords changed --> new HTTP Get needed

    var filter = {}; // Filter for filtering job offers
    filter.salary = 0;
    filter.experience = 0;
    filter.field = "";
    filter.type = "";
    filter.education = "";
    filter.keywords = "";
    filter.location = "";

    // public functions
    return {

      isLoading: function()
      {
        return isLoading;
      },

      setBookmarks: function (offers)
      {
        bookmarkCache = offers;
        updateBookmarks();
        filterResults();
      },

      setApplications: function (offers)
      {
        applicationCache = offers;
        updateApplications();
        filterResults();
      },

      getJobOffers: function ()
      {
        return filteredJobs;
      },

      getJobDetails: function (jobId) {
        // Search through all Cached data to find the requests offer
        var returnValue = []
        angular.forEach(jobOfferCache, function (value, key) {
          if (value.id == jobId) {
            returnValue = value;
          }
        });
        if (returnValue.length == 0)
        {
          angular.forEach(bookmarkCache, function (value, key) {
            if (value.id == jobId) {
              returnValue = value;
            }
          });
        }
        if (returnValue.length == 0)
        {
          angular.forEach(applicationCache, function (value, key) {
            if (value.id == jobId) {
              returnValue = value;
            }
          });
        }
        if (returnValue.length == 0)
        {
          angular.forEach(filteredJobs, function (value, key) {
            if (value.id == jobId) {
              returnValue = value;
            }
          });
        }
        return returnValue;
      },

      loadJobOffers: function () {
        // Only fetch jobs from Server if keywords or location changed.
        // Else only filter down the already fetched and Cached data
        if (searchChanged) {
          // changing loading circle on GUI
          isLoading = true;
          $rootScope.$broadcast("loadingStateChanged");

          // create URL
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

          // Call Server
          $http({method: 'GET', url: url})
            .success(function (result) {
              jobOfferCache = [];
              // remove underscores from Enum fields
              angular.forEach(result, function (value, key) {
                var temp = value;
                temp.field = temp.field.replace("_", " ");
                temp.jobType = temp.jobType.replace("_", " ");
                temp.education = temp.education.replace("_", " ");
                jobOfferCache.push(temp);
              })
              // apply filter to job offers
              updateBookmarks();
              updateApplications();
              filteredJobs = filterResults();

              // changing loading circle on GUI
              isLoading = false;
              $rootScope.$broadcast("jobListChanged");
              $rootScope.$broadcast("loadingStateChanged");
            })
            .error(function () {
            });

        }else{
          updateBookmarks();
          updateApplications();
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
          // remove underscores from Enum fields
          return job.field.replace("_", " ") == filter.field
        });
      }
      if (filter.type != "") {
        filtered = filtered.filter(function (job) {
          // remove underscores from Enum fields
          return job.jobType.replace("_", " ") == filter.type
        });
      }
      if (filter.education != "") {
        filtered = filtered.filter(function (job) {
          // remove underscores from Enum fields
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

    function updateBookmarks()
    {
      var allOffers = [];
      angular.forEach(jobOfferCache, function (offer, key) {
        angular.forEach(bookmarkCache, function (bookmark, key) {
          if (bookmark.id == offer.id) {
            offer.isBookmarked = true;
          }
          else
          {
            offer.isBookmarked = false;
          }
        });
        allOffers.push(offer)
      });
      jobOfferCache = allOffers;
    }

    function updateApplications()
    {
      var allOffers = [];
      angular.forEach(jobOfferCache, function (offer, key) {
        angular.forEach(applicationCache, function (application, key) {
          if (application.id == offer.id) {
            offer.isApplied = true;
          }
          else
          {
            offer.isApplied = false;
          }
        });
        allOffers.push(offer)
      });
      jobOfferCache = allOffers;
    }
  })
