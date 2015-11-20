var myApp= angular.module("ReportApp",['chart.js']);

myApp.controller("ReportController",['$scope','$http',function($scope,$http){
	var items=[1,2,3];
	var q_list=[];//q_list=[{no:cid},{}]

	//helper function
	function data_restructure (jsonfile1,jsonfile2) {
		
	}
	function get_data (cid) {
		$http.get("http://localhost:1991/api/"+cid).success(function(data){
			return data
		});

		
	}
	// init

	$scope.items=items;
	$http.get("http://localhost:1991/api/0").success(function(data){
				//console.log(data);
				$scope.cidvalue=0;
				if (data.data[0].typ=="bar"){
					// console.log("bar");
					// $scope.type="Bar";
					
     //    			$scope.labels = data.data[0].labels;
  			// 		$scope.data = [data.data[0].values,[]];
				}
				else if (data.data[0].typ=="pie"){
					console.log("pie");
					$scope.type="Pie";
					$scope.labels= data.data[0].labels;
					$scope.data= data.data[0].values;
				};
				$scope.cid=data.data[0].cid;
				$scope.report= data.data[0];

	});

	// $http.get("http://localhost:5000/api/0").success(function(data){
	// 	if (data.data[0].typ=="bar"){
	// 				console.log("bar");
	// 				$scope.type="Bar";
 //        			$scope.labels = data.data[0].labels;
 //  					$scope.series=["A",""];
 //        			$scope.labels = data.data[0].labels;
 //  					$scope.data = [data.data[0].values,[]];
	// 			}
	// 			else if (data.data[0].typ=="pie"){
	// 				console.log("pie");
	// 				$scope.type="Pie";
	// 				$scope.labels= data.data[0].labels;
	// 				$scope.data= data.data[0].values;
	// 			};
	// 			$scope.cid=data.data[0].cid;
	// 			$scope.report= data.data[0];
	// 		$scope.toggleg= function(r,data){
	// 				if (r=="p") {
	// 					$scope.type="Pie";
	// 					$scope.data=data.data[0].values;
	// 				}
	// 				else if (r=="b") {
	// 					$scope.type="Bar";
	// 					$scope.series=["A",""];
	// 					$scope.labels = data.data[0].labels;
	// 					$scope.data = [data.data[0].values,[]];
	// 				};
	// 					};



	// });
		$scope.toggleg= function(r,cid){
			data= get_data(cid);
			alert (data.data[0]);
		if (r=="p") {
			$scope.type="Pie";
			
			$scope.data=data.data[0].values;
			$scope.labels= data.data[0].labels;
			
		}
		else if(r=="b"){
			$scope.type="Bar";
			$scope.data=[data.data[0].values,[]];
			$scope.labels= data.data[0].labels;
			$scope.series=["A",""];

		};
	};

	$scope.lol = function(cid,typer){
		$scope.cidvalue=cid;
		
		var l= 0;
		if (typer=="n") {
			 //rt(typer);
			l= parseInt(cid) +1;
		}
		else if (typer=="p") {
			// alert (type);
			l = parseInt(cid)-1;
		};
		var url="http://localhost:1991/api/"+l;
		$http.get(url).success(function(data){
			//console.log(data);
				if (data.data[0].typ=="bar"){
				alert("kk")
				}	
				else if (data.data[0].typ=="pie"){
					console.log("pie");
					$scope.type="Pie";
					$scope.labels= data.data[0].labels;
					$scope.data= data.data[0].values;
				};
				$scope.cid=data.data[0].cid;
				$scope.report= data.data[0];
				//
				$scope.toggleg= function(r,data){
					if (r=="p") {
						$scope.type="Pie";
						$scope.data=data.data[0].values;
					}
					else if (r=="b") {
						$scope.type="Bar";
						$scope.series=["A",""];
						$scope.labels = data.data[0].labels;
						$scope.data = [data.data[0].values,[]];
					};
						};
		});
	};
		

}]);

