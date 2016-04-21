app.factory('secondarySearch',['$http','searchCriteria', function($http,criteria){
	// return function(numberRequests){
	// 	var options = {
	// 		method:'GET',
	// 		url:'http://content.guardianapis.com/search',
	// 		params:{
	// 			"page" : Math.ceil(criteria.page * criteria.tileNum/numberRequests)+1,
	// 			"page-size" : numberRequests, 
	// 			"show-fields" : "all",
	// 			"q" : criteria.searchText,
	// 			"api-key" : criteria.apiKeyArticle
	// 		}
	// 	}
	// 	if(criteria.filtered){
	// 		options.params['section'] = criteria.topicsString();
	// 	}

	// 	return $http(options)
	// }
	return function(numberRequests){
		return $http({
			method:'GET',
			url:'http://104.154.57.225:8082/search',
			params:{
				"pagesize" : numberRequests, 
				"q" : criteria.searchText,
				"topics" : criteria.topicsString(),
				"type" : criteria.type
			}
		})
	}
}])
