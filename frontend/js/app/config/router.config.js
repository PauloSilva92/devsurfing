(function(){
	angular
		.module('myapp')
			.config(routerConfig);

		function routerConfig($routeProvider){
			$routeProvider.when('/edit',{
				templateUrl : 'templates/editar.html'
			});
			$routeProvider.when('/advert',{
				templateUrl : 'templates/advert.html'
			});
			$routeProvider.when('/',{
				templateUrl : 'templates/feed.html'
			});
		}
})()