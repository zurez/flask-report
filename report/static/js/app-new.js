var myApp= angular.module("ReportApp",["chart.js"]);
myApp.controller("ReportController",["$http","$scope","$location",function($http,$scope,$location){

	  //Helper function 1
    function check_if_exists (arg, aList) {
        for (var i = 0; i < aList.length; i++) {
            if (aList[i]==arg){
                return true;
            }
            return false;
        };
    }//func1
    // Helper function 2
    function cot (arr) {
        var a = [], b = [], prev;
        var c = {};
    
     // arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    
    return [a, b];

    }//func2
    //SID
    // var s_id = $location.absUrl().split("/")[4].split(":")[1];
    var s_id= "12";
    //URLS
    var survey_str= "/api/survey/"+s_id+"/json";
    var json_resp= "/api/survey/"+s_id+"/response/aggregate";
   	//Get Survey Json //Bad Way
    $http.get(survey_str).success(function(struct){
    		$http.get(json_resp).success(function(resp){
    			//Now I have access to Survey Structure (struct) and Survey Response
    			$scope.stitle= struct.game_title; //Set Survey Title
    			$scope.question_list= resp.columns.slice(2);//Get question List
    			$scope.total_question= $scope.question_list.length;
    			console.log($scope.question_list);
    			
    			$scope.type="Text";
    			$scope.counter= 0;
    			//Navigation Button Control
    			$scope.navigate= function(type){
    					if (type=="next") {$scope.counter+=1;}
    					else if (type=="prev") {$scope.counter-=1;};
    					//get cid
    					$scope.cid =$scope.question_list[$scope.counter];
    					// $scope.question_label_raw= resp.questions;
    					//Get Question Label !!c <3 Lol is Life.
    					for (var i = 0; i < resp.questions.length; i++) {
    						if (resp.questions[i][0]==$scope.cid) {
    							$scope.question_label= resp.questions[i][1];
    						};
    					};
    					// Get Question Type and Options List.
    					for (var i = 0; i < struct.fields.length; i++) {
    						if (struct.fields[i].cid==$scope.cid) {
    							$scope.question_type = struct.fields[i].field_type;
    							$scope.question_options= struct.fields[i].field_options;

    						};
    					};
    					console.log($scope.question_options);
    					//Get total responses for that question
    					var responses_for_a_cid= [];
    					var index= resp.columns.indexOf($scope.cid);
    					for (var i = 0; i < resp.rows.length; i++) {
    						var response= resp.rows[i][index];
    						responses_for_a_cid.push(response);
    					};
    					// console.log(cot(["a","a","b","b"])); //Why wrong values? No idea.
    					//If an option has no values. then add 0 as its default value otherwise Graph will not initialize. Bleh!
    					for (var i = 0; i < responses_for_a_cid.length; i++) {
    						//
    					};


    				};//navigate ends here!


    		});
    		
    });

}]);