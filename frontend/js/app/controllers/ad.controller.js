(function() {
'use strict';

    angular
        .module('myapp')
        .controller('adController', adController);

    adController.$inject = ['$scope','adService','$window'];
    function adController($scope, adService,$window) {
        $scope.save = _save;
        $scope.update = _update;
        $scope.getAll = _getAll;
        $scope.get = _get;
        $scope.delete = _delete;
        
        function errorMessage(){
            swal('Não foi possível acessar o servidor');
        }
        
        function advertConstructor(advert){
            advert.user_id = $window.sessionStorage.getItem('id');
            advert.adress = {};
            advert.adress.country = $window.sessionStorage.getItem('country');
            advert.adress.city = $window.sessionStorage.getItem('city');
            advert.adress.state = $window.sessionStorage.getItem('state');
            advert.tags = advert.tags.split(" ");
            
            return advert;
        }
        
        function _save(advert){
            
            advert = advertConstructor(advert);
            console.log(advert);
            
            adService.save(advert).then(function success(data){
                console.log(data);
            }, function error(status){
                if (status === 500) errorMessage();
            });
        }
        
        function _update(advert_id, advert){
            adService.update(advert_id,advert).then(function success(data){
               console.log(data); 
            }, function error(){
                errorMessage();
            });
        }
        
        function _getAll(user_id){
            adService.getAll(user_id).then(function success(data){
               console.log(data); 
            }, function error(){
                errorMessage();
            });
        }
        
        function _get(advert_id){
            adService.get(advert_id).then(function success(data){
               console.log(data); 
            }, function error(){
                errorMessage();
            });
        }
        
        function _delete(advert_id){
            adService.delete(advert_id).then(function success(data){
               console.log(data); 
            }, function error(){
                errorMessage();
            });
        }
    }
})();