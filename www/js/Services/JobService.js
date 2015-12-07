/**
 * Created by Patrick on 23.11.2015.
 */
angular.module('Workforce.services', [])
.factory('JobService', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var dataCache = [];

  var allJobs = [{
    id: 0,
    title: 'Java',
    jobType: 'internship',
    location: 'Stuttgart'
  }, {
    id: 1,
    title: 'Java',
    jobType: 'bachelor Thesis',
    location: 'Hamburg'
  }, {
    id: 2,
    title: 'Matlab',
    jobType: 'Master Thesis',
    location: 'Stuttgart'
  }, {
    id: 3,
    title: 'Matlab',
    jobType: 'internship',
    location: 'Dresden'
  }];

  return {
    search: function(keywords, location) {
      if (dataCache == [])
      {
        var locationEncoded = encodeURIComponent(location);
        var keywordsEncoded = encodeURIComponent(keywords);
        $http.get("http://jobcenter-hftspws10.rhcloud.com/rest/jobs/" + keywordsEncoded + "/" + locationEncoded)
          .success(function (result) {
            dataCache = result;
          })
      }
      matchingOffers = [];
      angular.forEach(allJobs, function(value, key) {
        if ((value.location.indexOf(location) > -1) ||
        ((value.title.indexOf(keywords) > -1)||
          (value.jobType.indexOf(keywords) > -1)))
        {
          matchingOffers.push(value);
        }
      })

      return matchingOffers;
    },

    getDetails: function(jobId) {
      var returnValue =[]
        angular.forEach(allJobs, function(value, key){
          if(value.id == jobId)
          {
            returnValue = value;
          }
        });
      return returnValue;
    }
  };
});
