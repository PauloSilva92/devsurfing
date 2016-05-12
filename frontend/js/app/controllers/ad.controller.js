(function() {
'use strict';

    angular
        .module('myapp')
        .controller('adController', adController);

    adController.$inject = ['$scope','adService','$window','$document'];
    function adController($scope, adService,$window,$document) {
        $scope.save = _save;
        $scope.update = _update;
        $scope.getAll = _getAll;
        $scope.get = _get;
        $scope.delete = _delete;
        $scope.isUser = isUser;
        $scope.searchTag = _searchTag;
        
        
        function _searchTag(searhString){
            if(searhString){
                $window.location.assign('#/search/'+searhString);
                document.getElementById('srch-term').value='';    
            }else{
                swal('Insira uma palavra para buscar');
            }
            
        }
        
        function isUser(advert){
            if($window.sessionStorage.getItem('id') == advert.user_id){
                return true;
            }else{
                return false;
            };
        }
        
        function errorMessage(){
            swal('Não foi possível acessar o servidor');
        }
        
        function advertConstructor(advert){
            advert.user_id = $window.sessionStorage.getItem('id');
            advert.adress = {};
            advert.adress.country = $window.sessionStorage.getItem('country');
            advert.adress.city = $window.sessionStorage.getItem('city');
            advert.adress.state = $window.sessionStorage.getItem('state');
            advert.user_name = $window.sessionStorage.getItem('nome');
            advert.tags = advert.tags.split(" ");
            
            return advert;
        }
        
        function _save(advert){
            
            advert = advertConstructor(advert);
            
            adService.save(advert).then(function success(data){
                advert = {};
                $window.location.assign('dashboard.html#/myadverts');
            }, function error(status){
                errorMessage();
            });
        }
        
        
        function _update(advert_id, advert){
            
            console.log($scope.advert);
            adService.edit(advert_id,advert).then(function success(data){
               console.log(data); 
            }, function error(){
                errorMessage();
            });
        }
        
        function _getAll(){
            const user_id = $window.sessionStorage.getItem('id');
            adService.getAll(user_id).then(function success(data){
               $scope.adverts = data.data; 
            }, function error(){
                errorMessage();
            });
        };
        
        function _get(advert_id){
            adService.get(advert_id).then(function success(data){
               $scope.advert = data.data; 
            });
        }
        
        function _delete(advert_id){
            swal({
                title: "Tem certeza disso?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim",
                closeOnConfirm: true,
                html: false
            }, 
              function(){
                adService.delete(advert_id).then(function success(data){
                    $window.location.reload();
                });  
              }
            )}
        
        _getAll();
    }
})();