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
   
    //Function 3
    $scope.toggle= true;
    $scope.$watch('toggle',function(){
        $scope.toggleText = $scope.toggle ? 'Pie' : 'Polar';
        $scope.type = $scope.type === 'PolarArea' ?
        'Pie' : 'PolarArea';
        
    })

  

    
    
    
  
    var s_id = $location.absUrl().split("/")[4].split(":")[1];

    var survey_str= "/api/survey/s:"+s_id+"/json";
    var json_uri= "/api/survey/s:"+s_id+"/response/aggregate";

               
    //Get survey structure
    $http.get(survey_str).success(function(fata){
        $http.get(json_uri).success(function(data){
          // /  Init
             $scope.type="Pie";
                $scope.labels= ["A","B"];
                $scope.data= [1,2];

            
            var total_q=0;// a number | totalQuestions
            var o_list={};//o_list= ["cid2":{label:"",options=[]},"cid 3"]
            var q_list=[]; //q_listist=["cid3","cid4"] | questionList
            var stitle= fata.game_title;
            var type_list={};
            // 

                for (var i = 0; i < fata.fields.length; i++) {
                   var cid = fata.fields[i].cid
                    q_list.push(cid);
                       total_q= total_q+1;
                var label= fata.fields[i].label;
                var type= fata.fields[i].field_type;
                // o_list.push({label,"option":fata.fields[i].field_options,"cid":cid});
                o_list[cid]={label,"option":fata.fields[i].field_options};
                type_list[cid]=type;
                }//for loop for q_listist
             

                // 
                
                $scope.total_r = data.len;
        
                var c = data.columns;//shorthand 
                var r = data.rows;
            
                var total_resp= data.len;
                var restrc= {};// restrc= [[{cid:[{option:value,option2:value2}]}]
                for (var i = 2; i < c.length; i++) {
                    var tempAns= [];
                    var cid = c[i];
                   
                    for (var j = 0; j < r.length; j++) {
                        // Options are keys now , check if it exists
                        tempAns.push(r[j][i]);

                    };
                 

                // restrc.push({"cid":cid,"ans":cot(tempAns)[1]});//I hope count works.lol 
                restrc[cid]={"ans":cot(tempAns)[1]};
                $scope.ites=restrc  ;
        };
        $scope.lol= function  (cid,typer) {

        var max = q_list.length-1;//Max length of the Report
      
        var new_cid;

        if (parseInt(cid)==0) {
            $scope.c=3;
        };
        if (parseInt(cid)>max) {
            $scope.d= 6;
            // $scope.cid= new_cid;

            console.log("Finished");
        };
        if (typer=="n") {
             //rt(typer);
            new_cid= parseInt(cid) +1;
            $scope.c=6;
        }
        else if (typer=="p") {
            // alert (type);
            new_cid = parseInt(cid)-1;
        }
  
        $scope.cid= new_cid;
        
        // else if(new_cid){$scope.c=5;};

        
        var lbl,dta,question;
        //get real cid for q_listist
        var r_cid= q_list[cid];

        if (type_list[r_cid]=="short_text"){console.log("short_text");}  else{};// if input type or something else
        
        
        //get question and answer from o_list;
 
        // for (var i = 0; i < o_list.length; i++) {
        //     if (o_list[i].cid==r_cid) {
        //         lbl = o_list[i].option;
        //      
        //         question=o_list[i].label;
        //     };
        // };
       
        lbl= o_list[r_cid].option;
        question= o_list[r_cid].label;

        //get answer values from restrc
        // for (var i = 0; i < restrc.length; i++) {
        //     // console.log($scopeo.q_list[i]);
        //     if (restrc[i].cid==r_cid) {
        //         data= restrc.ans;
                
        //     };
        // };
        
        // data = restrc[r_cid].ans;
        console.log[o_list["c10"].label];
        $scope.type="Pie";
        $scope.labels=lbl;//the options

        $scope.data=dta;//the values
        $scope.cid=new_cid;//set the new cid
       
    }
            
        });//data
    }); //fata
    
}]);//End
