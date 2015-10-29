
// app.controller('ReportController',['$scope','$http','$log','$timeout',function($scope,$http,$log,$timeout){

	
// 			$scope.getResults=function(){

// 				var cid= $scope.input_url;
// 				var timeout="";
// 				var poller= function(){
// 				$http.get("/report/12/console/q/"+cid).success(function(data,headers,config,status){
// 					if (status===202) {
// 						$log.log(status,data);console.log(data);

// 					} else if (status===200) {
// 						alert(data);
// 						$log.log(data);
// 			             $scope.result = data;
// 			             $timeout.cancel(timeout);
// 			             return false;
// 					};
// 					timeout=$timeout(poller,2000);

// 				});//GET Call
// 			}//poller
// 			poller();
// 			};
// }]);



//main
  app.controller('ReportController', ['$scope', '$log', '$http', '$timeout',function($scope, $log, $http, $timeout) {
    	// $scope.reddit = new Reddit();
    	
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
