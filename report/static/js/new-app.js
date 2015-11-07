var myApp= angular.module("ReportApp",["chart.js"]);

myApp.controller("ReportController",["$scope","$http",function($http,$scope){

	
	var q_list=[]; //q_list=["cid3","cid4"]
	var o_list=[];//o_list= ["cid2":{label:"",options=[]},"cid 3"]
	var total_q=0;// a number
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
    	for (var i = 0; i < data.length; i++) {
    		
    	};
    });
    //Write some permanent values on the Page, eg : survey title , id etcs
    $scope.title= survey_title;
    $scope.total_q= total_q;
    $scope.sid= s_id;
    $scope.total_r=total_r; //total_responses
