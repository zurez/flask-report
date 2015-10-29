
var myApp = angular.module('ReportApp',['infinite-scroll','chart.js']);
// Service

// Reddit constructor function to encapsulate HTTP and pagination logic
myApp.factory('Reddit', function($http) {
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "http://localhost:5000/api";
    $http.jsonp(url).success(function(data) {
    	// The logic to do with the data.
    	console.log(data);
      var items = data.data.children;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i].data);
      }
      // this.after = "t3_" + this.items[this.items.length - 1].id;
      this.busy = false;
    }.bind(this));
  };

  return Reddit;
});
 
  myApp.controller('ReportController', ['$scope', '$log', '$http', '$timeout',function($scope, $log, $http, $timeout,Reddit) {
    	// Should be a Service , Don't know why it not works :(
          var Reddit = function() {
            this.items = [];
            this.busy = false;
            this.after = '';
          };

          Reddit.prototype.nextPage = function() {
            if (this.busy) return;
            this.busy = true;

            var url = "http://localhost:5000/api";

            $http.get(url).success(function(data) {
            	
            	
               if (data.typ=="bar") {
               	console.log("bar");
               }
               else if (data.typ=="pie"){
               	console.log("pie")}; 
              this.busy = false;
            }.bind(this));
          };


      $scope.reddit = new Reddit();
    	
    $scope.getResults = function() {

      $log.log("test");

      // get the URL from the input
      var userInput = $scope.input_url;
      // fire the API request
      $http.post('/report/12/console', {"cid": userInput}).
        success(function(results) {
          $log.log(results);
          getSurveyData(results);
          alert(results);

        }).
        error(function(error) {
          $log.log(error);
        });

    };

    function getSurveyData(cid) {

      var timeout = "";

      var poller = function() {
        // fire another request
        $http.get('/report/12/console/q/'+cid).
          success(function(data, status, headers, config) {
            if(status === 202) {
              $log.log(data, status);
            } else if (status === 200){
              $log.log(data);
              $scope.result = data;
              $timeout.cancel(timeout);
              return false;
            }
            // continue to call the poller() function every 2 seconds
            // until the timeout is cancelled
            timeout = $timeout(poller, 2000);
          });
      };
      poller();
    }

  }

  ]);



