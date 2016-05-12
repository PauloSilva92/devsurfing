(function(){
	'use strict';
	angular
		.module('myapp')
			.config(routerConfig);

		function routerConfig($routeProvider){
			$routeProvider.when('/advert/:advert_id',{
				templateUrl : 'templates/advert.html', 
				controller : function(advert, $scope){
					$scope.advert = advert;
				},
				resolve : {
					advert : function($route, adService){
						const advert_id = $route.current.params.advert_id;
						return adService.get(advert_id).then(function success(data) {
						 	return data.data;
						});
					}
				}
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
			$routeProvider.when('/user/:user_id',{
				templateUrl : 'templates/perfil.html',
				controller : function($scope, user){
					$scope.user = user;
				},
				resolve: {
					user : function ($route,userService){
						return userService.getOne($route.current.params.user_id).then(function success(data) {
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