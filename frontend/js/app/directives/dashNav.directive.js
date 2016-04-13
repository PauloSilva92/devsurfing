(function () {
	angular
		.module('myapp')
		.directive('dashNav',function(){
			return{
				restrict : 'E',
				templateUrl : 'templates/dashNav.html'
			}
		});
})();
