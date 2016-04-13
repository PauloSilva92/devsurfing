(function(){
	'use strict';
	angular
	.module('myapp')
	.config(interceptorsPush);
	
	interceptorsPush.$inject = ['$httpProvider'];
	
	function interceptorsPush($httpProvider){
		 $httpProvider.interceptors.push('authInterceptor');
	}
})();