(function(){
	'use strict';
	angular
		.module('myapp')
		.factory('messageService', messageService);

		messageService.$inject = ['$http'];

		function messageService($http){
			const _addMessage = (sent_id, received_id,message)=> $http.post('http://localhost:5000/message/'+sent_id+'/to/'+received_id, message);
            
            const _edit = (id,message)=> $http.put('http://localhost:5000/message/'+id, message);

			const _getMessage = (sent_id, received_id)=> $http.get('http://localhost:5000/message/'+sent_id+'/to/'+received_id);
            
            const _getAll = (user_id)=> $http.get('http://localhost:5000/message/all/'+ user_id);

			return {
				addMessage : _addMessage,
				getMessage: _getMessage,
                getAll: _getAll,
				edit: _edit
			};
		}
})();