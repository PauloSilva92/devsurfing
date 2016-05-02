(function() {
'use strict';

    angular
        .module('myapp')
        .controller('adController', adController);

    adController.$inject = ['$scope','adService'];
    function adController($scope, adService) {
        $scope.save = _save;
        $scope.update = _update;
        $scope.getAll = _getAll;
        $scope.get = _get;
        $scope.delete = _delete;
        
        function _save(advert){
            adService.save(advert).then(function success(data){
                console.log(data);
            });
        }
        
        function _update(advert_id, advert){
            adService.update(advert_id,advert).then(function success(data){
               console.log(data); 
            });
        }
        
        function _getAll(user_id){
            adService.getAll(user_id).then(function success(data){
               console.log(data); 
            });
        }
        
        function _get(advert_id){
            adService.get(advert_id).then(function success(data){
               console.log(data); 
            });
        }
        
        function _delete(advert_id){
            adService.delete(advert_id).then(function success(data){
               console.log(data); 
            });
        }
    }
})();