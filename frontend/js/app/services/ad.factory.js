(function(){
	'use strict';
	angular
		.module('myapp')
		.factory('adService', adService);

		adService.$inject = ['$http'];

		function adService($http){
			const _save = (advert)=> $http.post('http://localhost:4000/advert/save', advert);
            
            const _edit = (id,advert)=> $http.put('http://localhost:4000/advert/save/'+id, advert);

			const _get = (id)=> $http.get('http://localhost:4000/advert/'+ id);
            
            const _getAll = (id)=> $http.get('http://localhost:4000/advert/getall/'+ id);

			const _delete = (id)=> $http.delete('http://localhost:4000/advert/'+id);
			return {
				save : _save,
				get: _get,
                getAll: _getAll,
				edit: _edit,
				delete: _delete
			};
		}
})();