(function () {
	angular
		.module('myapp')
		.directive('loginForm',function(){
			return{
				restrict : 'E',
				templateUrl : 'templates/loginForm.html'
			}
		});
})();


