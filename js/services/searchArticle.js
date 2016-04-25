app.factory('searchArticle',['$http','searchCriteria', function($http,criteria){
	return function(){
		var options = {
			method:'GET',
			url:'http://content.guardianapis.com/search',
			params:{
				"page" :criteria.page.val,
				"page-size" : criteria.tileNum, 
				"show-fields" : "all",
				"q" : criteria.searchText,
				"api-key" : criteria.apiKeyArticle
			}
		};
		if(criteria.filtered){
			options.params['section'] = criteria.topicsString();
		}
		return $http(options);
	}
	// return function(){
	// 	return $http({
	// 		method:'GET',
	// 		url:'http://104.154.57.225:8082/search',
	// 		params:{
	// 			"pagesize" : criteria.tileNum,
	// 			"q" : criteria.searchText,
	// 			"topics" : criteria.topicsString(),
	// 			"type" : criteria.type
	// 		}
	// 	})
	// }
}])

