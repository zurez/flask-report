var myApp= angular.module("ReportApp",["chart.js"]);

myApp.controller("ReportController",["$scope","$log","$http","$location",function($scope,$log,$http,$location){
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
    //console.log(cot([4,4,4,1,1,2,2,2])[0],cot([4,4,4,1,1,2,2,2])[1]);
	//Function 3
    $scope.toggle= true;
    $scope.$watch('toggle',function(){
        $scope.toggleText = $scope.toggle ? 'Pie' : 'Polar';
        $scope.type = $scope.type === 'PolarArea' ?
        'Pie' : 'PolarArea';
        
    })

  

	
	
	
  
	var s_id = $location.absUrl().split("/")[4].split(":")[1];

	var survey_str= "/api/survey/s:"+s_id+"/json";
	//Get
	$http.get(survey_str).success(function(fata){
        var total_q=0;// a number | totalQuestions
        var o_list=[];//o_list= ["cid2":{label:"",options=[]},"cid 3"]
        var q_list=[]; //q_list=["cid3","cid4"] | questionList
		$scope.stitle= fata.game_title;
	
		for (var i = 0; i < fata.fields.length; i++) {
    	   var cid = fata.fields[i].cid
    		q_list.push(cid);
            // 
            
    		total_q= total_q+1;
            var label= fata.fields[i].label;
                
                o_list.push({label,"option":fata.fields[i].field_options,"cid":cid})
    		// for (var j = 0; j < fata.fields[i].field_options.length; j++) {
    		// 	var label= fata.fields[i].label;
                
    		// 	o_list.push({cid:{label,option:fata.fields[i].field_options}});
    		// };
    		

    	};

        $scope.q_total=total_q;
        $scope.o_l= o_list;
        $scope.q_l=q_list;

	});//

	var json_uri= "/api/survey/s:"+s_id+"/response/aggregate";
	//Get Response Data
    $http.get(json_uri).success(function(data){
    	$scope.total_r = data.len;
    	
    	var c = data.columns;//shorthand 
		var r = data.rows;
	
		var total_resp= data.len;
		var restrc= [];// restrc= [[{cid:[{option:value,option2:value2}]}]
    	for (var i = 2; i < c.length; i++) {
    		var tempAns= [];
    		var cid = c[i];
            // console.log(cid);
    		for (var j = 0; j < r.length; j++) {
    			// Options are keys now , check if it exists
    			tempAns.push(r[j][i]);

    		};
             // console.log(tempAns);

    		restrc.push({"cid":cid,"ans":cot(tempAns)[1]});//I hope count works.lol 

    	};
        // console.log(restrc[0]);
        $scope.r_l = restrc;
        $scope.ites= restrc; //This works 
        
        
    });
    // $scope.ites= $scope.r_l; //But this doesn;t though both are in global scope/
    $log.debug($scope.ites);

    // ///////////////////////////////
      //Init the page
    // var i=0;
    // console.log($scope.o_list);
    // var i_cid=$scope.o_list_l[i];
    // var i_options= $scope.o_l[0].label;
    // var i_data=[];
    // for (var i = 0; i < Things.length; i++) {
    //     Things[i]
    // };


    // var i_data= 
      //Navigate
    $scope.lol= function  (cid,typer) {
        var max = $scope.q_l.length;//Max length of the Report
       // console.log("cid: "+ cid);
        var new_cid=0;
        if (parseInt(cid)==max) {
            $scope.d= 6;
            $scope.cid= new_cid;

            console.log("Finished");
        };
        if (typer=="n" && parseInt(cid)<max) {
             //rt(typer);
            new_cid= parseInt(cid) +1;
            $scope.c=6;
        }
        else if (typer=="p") {
            // alert (type);
            new_cid = parseInt(cid)-1;
        }
        else if(new_cid){$scope.c=5;};
        $scope.labels=[];//the options
        $scope.data=[];//the values
        $scope.cid=new_cid;//set the new cid
        //get real cid for q_list
        var r_cid= $scope.q_l[cid];
        // console.log(r_cid);
  
        //get label from o_list;
        for (var i = 0; i < $scope.q_l.length; i++) {
            // console.log($scope.q_l[i]);
            if ($scope.q_l[i].cid==r_cid) {
               // console.log(r_cid);
            };
        };

    }

//
}]);//End
