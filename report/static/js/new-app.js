var myApp= angular.module("ReportApp",["chart.js"]);

myApp.controller("ReportController",["$scope","$http",function($http,$scope){

	//Helper function 1
	function check_if_exists (arg, aList) {
		for (var i = 0; i < aList.length; i++) {
			if (aList[i]==arg){
				return true;
			}
			return false;
		};
	}
	// Helper function 2
	function count (aList) {
		var  count = {}; 

 		uniqueCount.forEach(function(i) { count[i] = (count[i]||0)+1;  });var  count = {}; 
 		//return a dict with element as key and duplicate count as key
 		return count;

	}


	var q_list=[]; //q_list=["cid3","cid4"] | questionList
	var o_list=[];//o_list= ["cid2":{label:"",options=[]},"cid 3"]
	var total_q=0;// a number | totalQuestions
	//Get survey id
	var s_id = UriTemplate.extract("/survey/s:{s_id}/analysis", window.location.pathname).s_id;
	// Get survey structure
	var survey_str= UriTemplate.expand("/api/survey/{s_id}/json", {s_id: s_id});
	$http.get(survey_str).success(function(fata){
		var survey_title= fata.game_title;
		for (var i = 0; i < fata.fields.length; i++) {
    		total_q= total_q+1;
    		q_list.push(fata.fields[i].cid);

    		var total_resp= data.len;
    		for (var j = 0; j < fata.fields[i].field_options.length; j++) {
    			var label= fata.fields[i].label;
    			o_list.push({cid:{label,option:fata.fields[i].field_options}});
    		};
    		

    	};

	});

    //Get the Survey Responses
    var json_uri = UriTemplate.expand("/api/survey/{s_id}/response/aggregate", {s_id: s_id});
    //Get Response Data
    $http.get(json_uri).success(function(data){
    	var total_r = data.len;
    	var c = data.columns;//shorthand 
		var r = data.rows;
		var restrc= [];// restrc= [[{cid:[{option:value,option2:value2}]}]
    	for (var i = 2; i < c.length; i++) {
    		var tempAns= [];
    		var cid = c[i];
    		for (var j = 0; j < r.length; j++) {
    			// Options are keys now , check if it exists
    			tempAns.push(rows[j][i]);
    		};
    		restrc.push({cid:[count(tempAns)]});//I hope count works.lol 

    	};
    });
    //Write some permanent values on the Page, eg : survey title , id etcs
    $scope.title= survey_title;
    $scope.total_q= total_q;
    $scope.sid= s_id;
    $scope.total_r=total_r; //total_responses

    //Function to navigate through the group
    $scope.lol= function(counter,type){
    	//Default value for counter and type
    	 counter = typeof counter !== 'undefined' ? counter : 0;
   		 type = typeof type !== 'undefined' ? type : 'default';

    }
    //Function to toggle graph type
    $scope.toggle= function(argument) {
    	// body...d
    }
    //Graph Chart 

