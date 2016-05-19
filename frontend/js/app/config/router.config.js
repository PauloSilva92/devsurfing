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
				controller : function($route,adverts,$scope, userService){
					$scope.adverts = adverts;
					$scope.follow = follow;
					$scope.unfollow = unfollow;
					$scope.isFollowing = isFollowing;
					$scope.tag = $route.current.params.searchString;

					
					(function getLogged(){
						userService.get().then(function success(data){
							$scope.userLogged = data.data;
						})
					})();

					function isFollowing(){
						if($scope.userLogged){
							let result = $scope.userLogged.following.indexOf($scope.tag);
							if(result < 0){
								return true;	
							}else{
								return false;	
							}
						}
					}

					function reloadPage(){
						$route.reload();
					}

					function follow(value){
						const obj = {follow_id : value};
						userService.follow(obj).then(function success(data){
							reloadPage();
						});
					}

					function unfollow(value){
						const obj = {unfollow_id : value};
						userService.unfollow(obj).then(function success(data){
							reloadPage();
						});
					}

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
				controller : function($window,$route,$scope, user,userService){
					$scope.user = user;
					$scope.isUserLogged = isUserLogged;
					$scope.follow = follow;
					$scope.unfollow = unfollow;
					$scope.isFollowing = isFollowing;
					
					(function getLogged(){
						userService.get().then(function success(data){
							$scope.userLogged = data.data;
						})
					})();

					function isUserLogged(){
						const userProfile = $route.current.params.user_id;
						const userSession = $window.sessionStorage.getItem('id');
						if(userSession !== userProfile){
							return true;
						}else{
							return false;
						};
					}

					function isFollowing(){
						if($scope.userLogged){
							let result = $scope.userLogged.following.indexOf($scope.user._id);
							if(result < 0){
								return true;	
							}else{
								return false;	
							}
						}
					}

					function reloadPage(){
						$route.reload();
					}

					function follow(value){
						const obj = {follow_id : value};
						userService.follow(obj).then(function success(data){
							reloadPage();
						});
					}

					function unfollow(value){
						const obj = {unfollow_id : value};
						userService.unfollow(obj).then(function success(data){
							reloadPage();
						});
					}

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
			$routeProvider.when('/404',{
				templateUrl : 'templates/404.html'
			});
			$routeProvider.when('/',{
				templateUrl : 'templates/feed.html',
				controller: function($scope, $route,following,adService){
					if(following.length > 0){
						adService.listFollowed(following).then(function(data){
							$scope.adverts = data.data;
						});
					};
				},
				resolve : {
					following : function(userService){
						return userService.get().then(function(data){
							return data.data.following;
						})
					}
				}
			});
			$routeProvider.otherwise({redirectTo:'/404'})
		}
})()