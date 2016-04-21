app.controller('MainController', ['$scope','$window','$route','$routeParams','searchCriteria', function($scope,$window,$route,$routeParams,criteria){
	$scope.searchText='';
	$scope.tileNum = 13;
	criteria.type = "global";
	$scope.$watch('searchText',function(newVal){
		criteria.searchText = newVal;
	})
	$scope.$watch('tileNum',function(newVal){
		criteria.tileNum = newVal;
	})
	$scope.search = function(){
		criteria.topicsBar = false;
		$scope.$broadcast('searching');
	}
}])