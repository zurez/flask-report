var myApp= angular.module("ReportApp",["chart.js"]);
myApp.controller("ReportController",["$http","$scope","$location","ChartJs",function($http,$scope,$location,ChartJs){

	//ToDO
	//Change Panel for Non Graphical Report
	//
	function clean(){
		var myEl = angular.element( document.querySelector("#right_area") );
			myEl.empty();
	}
	function add()  {
		var myEl = angular.element( document.querySelector("#right_area") );
		myEl.append("Text");
	}
	function add_canvas () {
		var myEl = angular.element( document.querySelector("#right_area") );
		var htmlsnipp='<canvas id="base lolwut" class="chart-base" chart-type="type"chart-data="data" chart-labels="labels" chart-legend="true" ></canvas> ';
		myEl.append(htmlsnipp);
	}
	$scope.destroy=function clearChart() {
		var elementId= "base";
		console.log(ChartJs.Chart.instances);
		ChartJs.Chart.instances["chart-3"].destroy();
    if (document.getElementById(elementId)) {
    		console.log("Destroyed");
        var charts = ChartJs.Chart.instances; // Get all chart instances

        for (var key in charts){ // loop looking for the chart you want to remove
            if (!charts.hasOwnProperty(key)){
            	console.log("something");
                continue;
                
            }
            var chartAux = ChartJs.Chart.instances[key]; 
            if (chartAux.chart.ctx.canvas.id === elementId){ 
                // Remove chart-legend before destroying the chart
                var parent = chartAux.chart.ctx.canvas.parentElement;
                var legend = chartAux.chart.ctx.canvas.nextElementSibling;
                parent.removeChild(legend);
                // Compare id with elementId passed by and if it is the one            
                // you want to remove just call the destroy function
                ChartJs.Chart.instances[key].destroy(); 
                
            }
        }
    }
}
    // Helper function 2
    function cot (arr) {
       var a = [], b = [], prev;

    arr.sort();
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
    //Function to remove chart 
    function remove_chart () {
    	$scope.type = "Bar";
    	$scope.data=[];
    }

    //SID
    // var s_id = $location.absUrl().split("/")[4].split(":")[1];
    var s_id= "12";
    var v=1;
    $scope.v=1;
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
    			
    			
    			$scope.typed="Text";
    			$scope.counter= 0;
    			//Destroy Chat
    					 $scope.$on('create', function (event, chart) {
							        
							        $scope.charth = chart;
										});
    						
    				//

    			//We need to put up an init code here :(
    				//So that the user doesn't sees an empty page.
    				//
    			//Navigation Button Control
    			$scope.navigate= function(type){
    											
    					// clean();
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
    					// console.log(cot(["a","a","b","b"])); //Why wrong values? No idea. ==Solved --> missed sorting
    					//If an option has no values. then add 0 as its default value otherwise Graph will not initialize. Bleh!
    					var count = cot(responses_for_a_cid); //an array of two array [[options],[count]] // Remove null from here,
    			
    					var count_options = count[0];//Should have used the same variable .. ??? SHould learn DRY
    					var count_options_total= count[1];
    					function option_map(){
    						var a={};
    						for (var i = 1; i < $scope.question_options.length+1; i++) {
    							// a.push("a_"+i.toString());
    							a["a_"+i.toString()]=$scope.question_options[i-1];
    							//{"a_1":"option"}
    						};
    						return a;

    					};
    					try{
    					var options_map= option_map(); //Useful for getting labels
    				}
    				catch(err){ console.log ("Error_option_map");}
    				
    					
    					//check if all options are counted
    					//Big mistake count[0]==[a_1, a_2] but question_options = [text ,] ==Solved!
    				
    					// if (count[0].length!= $scope.question_options.length) {
    					// 	//This means some options have not been counted,
    					// 	//Find out which options have not been counted.

    					// 	console.log(count[0],count[0].length, $scope.question_options.length);
    					// 	var notcounted = $scope.question_options.filter(function(val) {
									// 			  return count[0].indexOf(val) == -1;
									// 			});

    					// 	//Not count is an array of options not been responded by any user.
    					// 	for (var i = 0; i < notcounted.length; i++) {
    					// 		count_options.push(notcounted[i]);
    					// 		count_options_total.push(0);
    					// 	};
    					// 	console.log("No Error");
    						
    					// }

    					//Some graph variables

    					var type , series;
    					//Now Set the Graph
    					 if ($scope.question_type=="short_text") {
    					 	//write a function to get responses.
    					 	$scope.vis="hidden";
    					 	$scope.text= "Lol hfjfjff \n nhfhfhfhfh";
    					 }
    					 else if ($scope.question_type=="single_choice"){

    					 		// $scope.type="Pie";
    					 		// $scope.data=count_options_total;

    					 		// var labels=[];
    					 		// for (var i = 0; i < count_options.length; i++) {
    					 		// 	labels.push(count_options[i]);
    					 		// };
    					 		// $scope.label=labels;
    					 }
    					 else if ($scope.question_type=="multiple_choice"){
    					 	$scope.text= "";
    					 	$scope.type="Bar";
    					 	$scope.data=[count_options_total];
    					 	var label=[];
    					 	for (var i = 0; i < count_options.length; i++) {
    					 		var single_option= count_options[i].split("###");
    					 		console.log("single_option", count_options);
    					 		var to_push= "";
    					 		for (var i = 0; i < single_option.length; i++) {
    					 			to_push= to_push + " "+ options_map[single_option[i]];};
    					 		label.push(to_push);

    					 	};
    					 	$scope.labels=label;

    					 }
    					 else if ($scope.question_type=="ranking"){}
    					 else if ($scope.question_type=="rating"){}
    					 else if ($scope.question_type=="yes_no"){
    					 $scope.text=""; //Remove the text thing.
   				 		 $scope.type="Bar";
    					 $scope.data=[count_options_total];
				 		 var labels=[];
    					
    					 		for (var i = 0; i < count_options.length; i++) {
    					 			labels.push(options_map[count_options[i]]);

    					 	
    					 		};
    					 		$scope.labels=labels;
    					 		
    					 };

    					// for (var i = 0; i < count[0].length; i++) {
    						
    						
    					// };


    				};//navigate ends here!


    		});
    		
    });

}]);
