(function () {
	angular
		.module('myapp')
		.directive('navDir',function(){
			return{
				restrict : 'E',
				templateUrl : 'templates/nav.html'
			}
		});
})();
