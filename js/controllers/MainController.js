app.controller('MainController', ['$scope','$window','$route','$routeParams','searchCriteria', function($scope,$window,$route,$routeParams,criteria){
	$scope.searchText='';
	$scope.tileNum = 13;
	$scope.page =  criteria.page; 
	criteria.type = "global";
	$scope.$watch('searchText',function(newVal){
		criteria.searchText = newVal;
	})
	$scope.$watch('tileNum',function(newVal){
		criteria.tileNum = newVal;
	})
	$scope.search = function(){
		criteria.topicsBar = false;
		criteria.page.val = 1;
		$scope.$broadcast('searching');
	}
	$scope.prev = function(){
		if($scope.page.val !=1){
			criteria.page.val--;
			$scope.$broadcast('searching');
		}
	}
	$scope.next = function(){
		criteria.page.val++;
		$scope.$broadcast('searching');
	}
}])