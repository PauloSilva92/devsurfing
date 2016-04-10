(function () {
	angular
		.module('myapp')
		.directive('signinForm',function(){
			return{
				restrict : 'E',
				templateUrl : 'templates/signinForm.html'
			}
		});
})();


