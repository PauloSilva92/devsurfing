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

			const _getOne = (id)=> $http.get('http://localhost:3000/user/'+id);

			const _edit = (user)=> $http.put('http://localhost:3000/user/save', user);

			const _delete = (id)=> $http.delete('http://localhost:3000/user/'+id);

			const _follow = (value)=> $http.put('http://localhost:3000/user/follow',value);

			const _unfollow = (value)=>$http.put('http://localhost:3000/user/unfollow',value);

			return {
				save : _save,
				login : _login,
				get: _get,
				getOne : _getOne,
				edit: _edit,
				delete: _delete,
				follow : _follow,
				unfollow : _unfollow
			};
		}

})();
