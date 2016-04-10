(function(){
	'use strict';
	
	angular
	.module('myapp')
	.controller('userController',userController);
	
	userController.$inject = ['$scope','userService',"$window"];
	
	function userController($scope,userService,$window){
		$scope.save = save;
		//$scope.login = login;

		function save(user){
			console.log(user);
			userService.save(user).then(function success(data){
				console.log(data.data);
				if(data.data.token){
					$window.localStorage.setItem('token',data.data.token);
					$window.location.assign('dashboard.html')
				}else{
					swal(data.data.message);
				};
			},
			function error(status){
				
			});
		}

		// function login(user){
		// 	console.log(user);
		// }
	}

})();