var app = angular.module('myApp',['ngMaterial','ngSanitize','ngRoute','ngMessages','ngAnimate'])
	.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/',{
			templateUrl: '../main.html',
			controller: 'MainController'
		})
		.when('/signup.html',{
			templateUrl:'../signup.html',
			controller: 'SignupController'
		})
		.when('/signin.html',{
			templateUrl:'../signup.html',
			controller: 'SignupController'
		})
		.otherwise({
			redirectTo:'/'
		})
	}])
	.run(function($rootScope,$timeout) {
    $rootScope.$on( "$routeChangeSuccess", function(event, current) {
  		$timeout(function(){$rootScope.$broadcast('searching');},200)
    });
  });