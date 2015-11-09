var myApp= angular.module("ReportApp",["chart.js"]);

myApp.controller("ReportController",["$scope","$http","$location",function($scope,$http,$location){
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
	function count (aList) {
		var  count = {}; 

 		aList.forEach(function(i) { count[i] = (count[i]||0)+1;  });var  count = {}; 
 		//return a dict with element as key and duplicate count as key
 		return count;

	}//func2
	//Function 3
	 $scope.toggle= function() {
    	$scope.buttName= 
    	$scope.type = $scope.type === 'PolarArea' ?
        'Pie' : 'PolarArea';
    }
    //
	var q_list=[]; //q_list=["cid3","cid4"] | questionList
	var o_list=[];//o_list= ["cid2":{label:"",options=[]},"cid 3"]
	var total_q=0;// a number | totalQuestions

	var s_id = $location.absUrl().split("/")[4].split(":")[1];

	var survey_str= "/api/survey/s:"+s_id+"/json";
	//Get
	$http.get(survey_str).success(function(fata){
		$scope.survey_title= fata.game_title;
		// alert(fata.game_title);
		for (var i = 0; i < fata.fields.length; i++) {
    		total_q= total_q+1;
    		q_list.push(fata.fields[i].cid);

    		
    		for (var j = 0; j < fata.fields[i].field_options.length; j++) {
    			var label= fata.fields[i].label;
    			o_list.push({cid:{label,option:fata.fields[i].field_options}});
    		};
    		

    	};

	});//
	var json_uri= "/api/survey/s:"+s_id+"/response/aggregate";
	//Get Response Data
    $http.get(json_uri).success(function(data){
    	$scope.total_r = data.len;
    	alert(data.len);
    	var c = data.columns;//shorthand 
		var r = data.rows;
		alert(r[0]);
		var total_resp= data.len;
		var restrc= [];// restrc= [[{cid:[{option:value,option2:value2}]}]
    	for (var i = 2; i < c.length; i++) {
    		var tempAns= [];
    		var cid = c[i];
    		for (var j = 0; j < r.length; j++) {
    			// Options are keys now , check if it exists
    			tempAns.push(r[j][i]);
    		};
    		restrc.push({cid:[count(tempAns)]});//I hope count works.lol 

    	};
    });

 //Write some permanent values on the Page, eg : survey title , id etcs
    $scope.title= $scope.survey_title;
    $scope.total_q= total_q;
    $scope.sid= s_id;
    $scope.total_r=$scope.total_r; //total_responses
}]);

myApp.controller("AeportController",["$scope","$location","$http",function($http,$scope,$location){

	

	
	//Get survey id
	// var s_id = $location.absUrl().split("/")[4].split(":")[1];
	var s_id="po";
	alert(s_id);
    alert("lol");
	// Get survey structure
	// var survey_str= UriTemplate.expand("/api/survey/{s_id}/json", {s_id: s_id});
	var survey_str= "/api/survey/s:"+s_id+"/json";

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

    
   

    //Function to navigate through the group
    $scope.lol= function(counter,type){
    	//Default value for counter and type
    	 counter = typeof counter !== 'undefined' ? counter : 0;
   		 type = typeof type !== 'undefined' ? type : 'default';

   		 //
   		 var qid= q_list[counter]; //Our question is set
   		 // We need to get all the options.
   		 var graph_labels= o_list


    }
    //Function to toggle graph type
   
    //Graph Chart 

}]);