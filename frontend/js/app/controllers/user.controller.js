(function(){
	'use strict';
	
	angular
	.module('myapp')
	.controller('userController',userController);
	
	userController.$inject = ['$scope','userService'];
	
	function userController($scope,userService){
		$scope.save = save;

		function save(user){
			console.log(user);
			userService.save(user).then(function success(data){
				console.log(data.data);
				if(!data.data.message){
					localStorage.setItem('token',data.token);
				}else{
					swal(data.data.message);
				};
			},
			function error(status){
				
			});
		}
	}

})();