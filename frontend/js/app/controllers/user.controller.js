(function(){
	'use strict';
	
	angular
	.module('myapp')
	.controller('userController',userController);
	
	userController.$inject = ['$scope','userService',"$window"];
	
	function userController($scope,userService,$window){
		$scope.save = save;
		$scope.login = login;
		$scope.logout = logout;
		$scope.edit = edit;
		$scope.delete = _delete;

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
					$window.location.assign('dashboard.html');
				}else{
					swal(data.data.message);
				};
			});
		}

		function get(){
			userService.get().then(function success(data){
				$scope.user = data.data;
				$window.sessionStorage.setItem('id',$scope.user._id);
				$window.sessionStorage.setItem('country',$scope.user.adress.country);
				$window.sessionStorage.setItem('city',$scope.user.adress.city);
				$window.sessionStorage.setItem('state',$scope.user.adress.state);
				$window.sessionStorage.setItem('nome',$scope.user.name.firstname + " " + $scope.user.name.lastname);
			});
		}

		function logout(){
			if($window.localStorage.getItem('token')){
				$window.localStorage.removeItem('token');
				$window.location.assign('index.html');
			};
		}

		function edit(user){
			userService.edit(user).then(function success(data){
				get();
				swal(data.data.message);
				$window.location.assign('dashboard.html')
			});
		}

		function _delete(){
			swal({
			  title: "Tem certeza disso?",
			  text: "Uma vez deletado o seu perfil não poderá ser reativado",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Sim, eu quero deletar minha conta",
			  closeOnConfirm: false,
			  html: false
			}, 
				function (){
					userService.delete($scope.user._id).then(function success(data){
						swal(data.data.message);
						logout();
					});
				}
			);
		}

		(function isDash(){
			if($window.location.pathname == '/dashboard.html'){
				if(!$window.localStorage.getItem('token')){
					$window.location.assign('index.html');
				}else{
					get();
				};
			}
		})();
		
		
	}

})();