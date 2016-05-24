(function(){
	'use strict';
	angular
		.module('myapp')
		.factory('messageService', messageService);

		messageService.$inject = ['$http'];

		function messageService($http){
			const _save = (message)=> $http.post('http://localhost:5000/message/', message);
            
            const _edit = (id,message)=> $http.put('http://localhost:5000/message/'+id, message);

			const _get = (id)=> $http.get('http://localhost:5000/message/'+ id);
            
            const _getAll = (user_id)=> $http.get('http://localhost:5000/message/all/'+ user_id);

			return {
				save : _save,
				get: _get,
                getAll: _getAll,
				edit: _edit
			};
		}
})();