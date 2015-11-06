var myApp= angular.module("ReportApp",['chart.js']);

myApp.controller("ReportController",['$scope','$http',function($scope,$http){
	var items=[1,2,3];
	// init
	$scope.items=items;
	$http.get("http://localhost:5000/api/0").success(function(data){
				//console.log(data);
				if (data.data[0].typ=="bar"){
					console.log("bar");
					$scope.type="Bar";
					$scope.series=["A",""];
        			$scope.labels = data.data[0].labels;
  					$scope.data = [data.data[0].values,[]];
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
	$scope.toggleg= function(r){
		if (r=="p") {
			$scope.type="Pie";
			$scope.data=data.data[0].values;

		};
	};

	$http.get("http://localhost:5000/api/0").success(function(data){
		if (data.data[0].typ=="bar"){
					console.log("bar");
					$scope.type="PolarArea";
        			$scope.labels = data.data[0].labels;
  					$scope.data = data.data[0].values;
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

	$scope.lol = function(cid,typer){
		
		
		var l= 0;
		if (typer=="n") {
			 alert(typer);
			l= parseInt(cid) +1;
		}
		else if (typer=="p") {
			// alert (type);
			l = parseInt(cid)-1;
		};
		var url="http://localhost:5000/api/"+l;
		$http.get(url).success(function(data){
			//console.log(data);
				if (data.data[0].typ=="bar"){
					console.log("bar");
					$scope.type="Bar";
					$scope.series=["A",""];
        			$scope.labels = data.data[0].labels;
  					$scope.data = [data.data[0].values,[]];
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
	};
		$scope.toggleg= function(r){
		if (r=="p") {
			$scope.type="Pie";
			$scope.data=data.data[0].values;
			
		};
	};

}]);

