(function(){
	'use strict';
	angular
		.module('myapp')
			.config(routerConfig);

		function routerConfig($routeProvider){
			$routeProvider.when('/advert',{
				templateUrl : 'templates/advert.html'
			});
			$routeProvider.when('/search/:searchString',{
				templateUrl : 'templates/searchAdverts.html',
				controller : function(adverts,$scope){
					$scope.adverts = adverts;
				},
				resolve : {
					adverts : function($route, adService){
						const searchString = $route.current.params.searchString;
						return adService.searchTag(searchString).then(function success(data) {
						 	return data.data;
						});
					}
				}
			});
			$routeProvider.when('/edit',{
				templateUrl : 'templates/editar.html'
			});
			$routeProvider.when('/newadvert',{
				templateUrl : 'templates/newAdvert.html'
			});
			$routeProvider.when('/myadverts',{
				templateUrl : 'templates/myadverts.html'
			});
			$routeProvider.when('/',{
				templateUrl : 'templates/feed.html'
			});
			$routeProvider.when('/editpassword',{
				templateUrl : 'templates/mudarSenha.html'
			});
		}
})()