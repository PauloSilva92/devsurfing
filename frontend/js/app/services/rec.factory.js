(function(){
	'use strict';
	angular
		.module('myapp')
		.factory('recService', recService);

		recService.$inject = ['$http'];

		function recService($http){
            const recomendedByFollow = (id)=> $http.get('http://localhost:5500/recomendedByFollow/'+id)
            const trending = (id)=> $http.get('http://localhost:5500/trending/'+id)
			return {
                recomendedByFollow,
                trending
            }
		}
})();
