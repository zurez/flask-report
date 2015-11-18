var myApp= angular.module("ReportApp",["chart.js"]);
myApp.controller("ReportController",["$http","$scope","$location",function($http,$scope,$location){

	  //Helper function 1
    // function check_if_exists (arg, aList) {
    //     for (var i = 0; i < aList.length; i++) {
    //         if (aList[i]==arg){
    //             return true;
    //         }
    //         return false;
    //     };
    // }//func1
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
    			
    			
    			$scope.type="Text";
    			$scope.counter= 0;

    			//We need to put up an init code here :(
    				//So that the user doesn't sees an empty page.
    				//
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
    			
    					//Get total responses for that question
    					var responses_for_a_cid= [];
    					var index= resp.columns.indexOf($scope.cid);
    					for (var i = 0; i < resp.rows.length; i++) {
    						var response= resp.rows[i][index];
    						responses_for_a_cid.push(response);
    					};
    					// console.log(cot(["a","a","b","b"])); //Why wrong values? No idea.
    					//If an option has no values. then add 0 as its default value otherwise Graph will not initialize. Bleh!
    					var count = cot(responses_for_a_cid); //an array of two array [[options],[count]] // Remove null from here,
    					var count_options = count[0];//Should have used the same variable .. ??? SHould learn DRY
    					var count_options_total= count[1];
    					function options_map(){
    						var a={};
    						for (var i = 1; i < $scope.question_options.length+1; i++) {
    							// a.push("a_"+i.toString());
    							a["a_"+i.toString()]=$scope.question_options[i-1];
    							//{"a_1":"option"}
    						};
    						return a

    					};
    					var options_map= options_map(); //Useful for getting labels
    					
    					//check if all options are counted
    					//Big mistake count[0]==[a_1, a_2] but question_options = [text ,] ==Solved!
    					if (count[0].length!= $scope.question_options.length) {
    						//This means some options have not been counted,
    						//Find out which options have not been counted.
    						var notcounted = $scope.question_options.filter(function(val) {
												  return count[0].indexOf(val) == -1;
												});
    						//Not count is an array of options not been responded by any user.
    						for (var i = 0; i < notcounted.length; i++) {
    							count_options.push(notcounted[i]);
    							count_options_total.push(0);
    						};
    						
    					}
    					//Some graph variables
    					var type , series;
    					//Now Set the Graph
    					 if ($scope.question_type=="short_text") {
    					 	$scope.right_title= "Responses";
    					 	//write a function to get responses.
    					 }
    					 else if ($scope.question_type=="single_choice"){
    					 		$scope.type="Pie";
    					 		$scope.data=count_options_total;
    					 		var labels=[];
    					 		for (var i = 0; i < count_options.length; i++) {
    					 			labels.push(count_options[i]);
    					 		};
    					 		$scope.label=labels;
    					 }
    					 else if ($scope.question_type=="multiple_choice"){}
    					 else if ($scope.question_type=="ranking"){}
    					 else if ($scope.question_type=="rating"){}
    					 else if ($scope.question_type=="yes_no"){
    					 		$scope.type="Pie";

    					 		$scope.data=count_options_total;
    					 		console.log($scope.data);
    					 		var labels=[];
    					 		for (var i = 0; i < count_options.length; i++) {
    					 			labels.push(count_options[i]);
    					 		};
    					 		$scope.label=labels;
    					 };


    					for (var i = 0; i < count[0].length; i++) {
    						
    						
    					};


    				};//navigate ends here!


    		});
    		
    });

}]);