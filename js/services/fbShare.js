app.factory('fbShare', ['$http', function($http){
	return function fbShare(url){
		console.log('requesting');
		FB.ui({
			method: 'share',
			href: url,
		}, function(response){});
	};
}])