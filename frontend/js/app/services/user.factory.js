(function(){
	'use strict';
	angular
		.module('myapp')
		.factory('userService', userService);

		userService.$inject = ['$http'];

		function userService($http){
			const _save = (user)=> $http.post('http://localhost:3000/user/save', user);

			const _login = (user)=> $http.post('http://localhost:3000/user/login', user);

			const _get = ()=> $http.get('http://localhost:3000/user/data');

			const _edit = (user)=> $http.put('http://localhost:3000/user/save', user);

			const _delete = (id)=> $http.delete('http://localhost:3000/user/'+id);
			return {
				save : _save,
				login : _login,
				get: _get,
				edit: _edit,
				delete: _delete
			};
		}

})();