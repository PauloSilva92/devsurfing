(function () {
	angular
		.module('myapp')
		.directive('menu',function(){
			return{
				restrict : 'E',
				templateUrl : 'templates/menu.html'
			}
		});
})();


