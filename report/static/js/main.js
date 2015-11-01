
var myApp = angular.module('ReportApp',['infinite-scroll','chart.js']);
// Service


  myApp.controller('ReportController', ['$scope', '$log', '$http', '$timeout',function($scope, $log, $http, $timeout,Reddit) {
    	// Should be a Service , Don't know why it not works :(
          var Reddit = function() {
            this.items = [1,2,3];
            this.busy = false;
            this.after = '';
            this.counter=0
          };
          
          Reddit.prototype.nextPage = function(contents) {
            if (this.busy) return;
            this.busy = true;

            var url = "http://localhost:5000/api";


            $http.get(url).success(function(data) {this.items.push(data.data[0]);this.busy = false;}.bind(this));
            	
      //       	var items= data.data[0];//list
      //       	// alert(data.data[0].typ);
      //   			this.items.push(data.data[0]);
      //   //        if (data.data[0].typ=="bar") {
      //   //        	this.counter= this.counter+1;
      //   //         // $scope.type="PolarArea";
      //   //         // $scope.labels = data.data[0].labels;
  				// 		// 		// $scope.data = data.data[0].values;
      //   //           this.items.push(data.data[0]);
  						

              
      //   //        }
      //   //        else if (data.data[0].typ=="pie"){
      //   //         this.counter= this.counter+1;
      //   //        					// $scope.type="Pie";
      //   //        					// $scope.labels = data.data[0].labels;
  				// 		// 		// $scope.data = data.data[0].values;
  				// 		// 			for (var i = 0; i < items.length; i++) {
      //   // this.items.push(data.data[0]);
      // // };

               					
      //        	     // $scope.testjs=this.items;          
  								            
      //          )};
  
             
            //   this.busy = false;
            // }.bind(this));

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



