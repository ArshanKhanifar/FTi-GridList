app.factory('tShare', ['$http', function($http){
	return function fbShare(url){
		$http({
			method:'GET',
			url:"https://twitter.com/intent/tweet",
			params:{
				url:url
			}
		})
	};
}]);