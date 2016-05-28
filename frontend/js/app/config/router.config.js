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
				$routeProvider.when('/messages',{
				templateUrl : 'templates/messages.html',
				controller : function(messages, $scope,$window){
					$scope.messages = messages;
					$scope.userLogged = $window.sessionStorage.getItem('id');
					$scope.redirectToMessages = redirectToMessages;
					
					function redirectToMessages(name,id){
						const firstname = name.split(' ')[0];
						const lastname = name.split(' ')[1];
						
					
						
						$window.location.assign("#/message/"+ $scope.userLogged +"/to/"+id+"/"+firstname+"/"+lastname);
					}
					
				},
				resolve : {
					messages : function(messageService,$window){
						const user_id = $window.sessionStorage.getItem('id');
						return messageService.getAll(user_id).then((data)=>{
							
							return data.data;
						},(data)=>{
							return [{
								sent_name: 'paulo silva',
								received_name: 'lucio',
								received_id: '13123'
							},
							{
								sent_name: 'paulo silva',
								received_name: 'anderson',
								received_id: '45345435'
							}];
						})
						
						
					}
				}
			});
			$routeProvider.when('/message/:sent_id/to/:received_id/:user_firstname/:user_lastname',{
				templateUrl : 'templates/message.html',
				controller: function($route,$scope,messages,$window, messageService){
					$scope.messages = messages.reverse();
					$scope.addMessage = addMessage;
					
					const sent_id = $route.current.params.sent_id;
					const received_id = $route.current.params.received_id;
					const sent_name = $window.sessionStorage.getItem('nome');
					const received_name = $route.current.params.user_firstname + ' ' + $route.current.params.user_lastname ;
					
					var socket = io.connect('http://localhost:5000');
					socket.on('connect', function(){
						console.log('conectou');
					})
					
					socket.on('newMessage', function(data){
						if(((data.sent_id === sent_id) && (data.received_id  === received_id)) || ((data.sent_id === received_id) && (data.received_id  === sent_id)) ){
							console.log('recarregou');
							$route.reload();	
						}
					});
					
					
					function addMessage(text){
						
						const message = {
							text: text,
							user_sent : $window.sessionStorage.getItem('nome'),
							user_id : $window.sessionStorage.getItem('id')
						};
						
						messageService.addMessage(sent_id,received_id, sent_name, received_name,message).then(function success(data){
							socket.emit('newMessage',{sent_id: sent_id, received_id: received_id});
							$route.reload();
						}, function error(data){
							$scope.messages.push(message);
						});
						
						
					}
					
				},
				resolve: {
					messages: function($route,messageService){
						const sent_id = $route.current.params.sent_id;
						const received_id = $route.current.params.received_id;
						
						return  messageService.getMessage(sent_id,received_id).then(function success(data){
							return data.data;
						}, function error(data){
							return [
								{
									user_sent: 'lucio',
									text: "Ola, como vai",
									sent_at: "12/12/1992"
								},
								{
									user_sent : 'paulo',
									text: "estou bem",
									sent_at: "12/12/1992"
								}
								
							]
						})
					}
				}
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