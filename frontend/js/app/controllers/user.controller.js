(function(){
	'use strict';
	
	angular
	.module('myapp')
	.controller('userController',userController);
	
	userController.$inject = ['$scope','userService',"$window"];
	
	function userController($scope,userService,$window){
		$scope.save = save;
		$scope.login = login;

		function save(user){
			userService.save(user).then(function success(data){
				if(data.data.token){
					$window.localStorage.setItem('token',data.data.token);
					$window.location.assign('dashboard.html')
				}else{
					swal(data.data.message);
				};
			});
		}

		function login(user){
			userService.login(user).then(function success(data){
				if(data.data.token){
					$window.localStorage.setItem('token',data.data.token);
					$window.location.assign('dashboard.html')
				}else{
					swal(data.data.message);
				};
			});
		}
	}

})();