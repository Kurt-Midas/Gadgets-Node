var app = angular.module('PlanetData', [])

/*app.constant('DATA', function($http){
	$http.get("planetary/planetDetails").success(function(value){
		console.log("well at least this shit works")
		return value;
	});
})*/

app.constant("FACILITIES", {
	E_CONTROL:{CPU:400,GRID:2600,COST:45000},
	E_HEAD:{CPU:110, GRID:550,COST:0},
	BASIC_FACTORY:{CPU:200,GRID:800,COST:75000},
	ADVANCED_FACTORY:{CPU:500,GRID:700,COST:250000},
	HIGHTECH_FACTORY:{CPU:1100,GRID:400,COST:525000},
	STORAGE:{CPU:500, GRID:700, COST:250000},
	LAUNCHPAD:{CPU:3600, GRID:700, COST:900000},
	LINK:{CPU:0.1539, GRID:0.1575, COST:0}
});

app.constant("PRODUCT",{
	TIER_COST:[4,400,7200,60000,1200000],
	TIER_VOLUME:[0.01, 0.38, 1.5, 6, 100]
})

app.constant("LEVEL",{
	LEVEL:[{CPU:1675, GRID:6000, COST:0},
	       {CPU:7057, GRID:9000, COST:580000},
	       {CPU:12136, GRID:12000, COST:1510000},
	       {CPU:17215, GRID:15000, COST:2710000},
	       {CPU:21315, GRID:17000, COST:4210000},
	       {CPU:25415, GRID:19000, COST:6310000}]
})

app.constant("PLANETNAME", {
	11: "Temp",
	12: "Ice",
	13: "Gas",
	2014: "Ocean",
	2015: "Lava",
	2016: "Barren",
	2017: "Storm",
	2063: "Plasma"
})

app.service('PiDataService',['$http', '$q', function($http, $q){
	
	return {
		hello: "hello from q'd service thing",
        getData: function() {
            var defer = $q.defer();
//            $http.get('/getdata.php', { cache: 'true'})
            $http.get('planetary/planetDetails').
            success(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        }
	}
}]);

app.service('PiDataModel', [function(){
	var data;
	
	return{
		setData: function(resolved){
	//		console.log("Successfully setting data in PiDataModel: " + angular.toJson(resolved));
			this.data = resolved;
		},
		getData: function(){
//			console.log("Retrieving data from PiDataModel: " + angular.toJson(this.data));
			return {
				planetMap: this.data.planetMap,
				resourceMap: this.data.resourceMap,
				schematicMap: this.data.schematicMap,
				itemDetails: this.data.itemDetails
			}
		}
//		planetMap: this.data.planetMap,
//		resourceMap: this.data.resourceMap,
//		schematicMap: this.data.schematicMap,
//		itemDetails: this.data.itemDetails
	
	/*,
		getData: function(){
//			console.log("Retrieving data from PiDataModel: " + angular.toJson(this.data));
			return this.data;
		}*/
	}
	
}]);
