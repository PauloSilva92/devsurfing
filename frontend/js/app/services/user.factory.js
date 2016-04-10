(function(){
	'use strict';
	angular
		.module('myapp')
		.factory('userService', userService);

		userService.$inject = ['$http'];

		function userService($http){
			const _save = (user)=>{
				return $http.post('http://localhost:3000/user/save', user);
			};

			return {
				save : _save
			};
		}

})();