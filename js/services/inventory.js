app.factory('inventory',['$http','searchCriteria',function($http,criteria){
	return function(number){
		var promise = new Promise(function(resolve,reject){
			$http({
				method:'GET',
				url:'http://104.196.24.187:8082/search',
				params:{
					"pagesize" : (criteria.page.val+1)*criteria.tileNum,
					"q" : criteria.searchText,
					"topics" : criteria.topicsString(),
					"type" : criteria.type
				}
			}).then(function(response){
				var responseObject = {data:{data:[]}};
				if(number==undefined){
					for (var i = (criteria.page.val - 1)*criteria.tileNum; i < criteria.page.val*criteria.tileNum ; i++){
						if(response.data.data[i]!=undefined){
							responseObject.data.data.push(response.data.data[i]);	
						}
					}
				}else{
					for (var i = (criteria.page.val)*criteria.tileNum; i < (criteria.page.val)*criteria.tileNum + number ; i++){
						if(response.data.data[i]!=undefined){
							responseObject.data.data.push(response.data.data[i]);	
						}
					}
				}
				resolve(responseObject);
			},function(error){
				console.log(error);
			})
		})
		return promise;
	}
}]);

// a function which on call will return only the number of pages wanted...