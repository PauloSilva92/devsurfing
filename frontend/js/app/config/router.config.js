(function(){
	angular
		.module('myapp')
			.config(routerConfig);

		function routerConfig($routeProvider){
			$routeProvider.when('/editar',{
				templateUrl : 'templates/editar.html'
			});
			$routeProvider.when('/',{
				templateUrl : 'templates/feed.html'
			});
		}
})()