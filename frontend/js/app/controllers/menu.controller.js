
(function(){
    'use strict';
    angular
        .module('myapp')
            .controller('menuController', menuController);
            
            menuController.$inject = ['$scope','$window'];
            
            function menuController($scope,$window){
                $scope.perfil= perfil;
                $scope.myadvert= myadvert;
                $scope.newadvert = newadvert;
                
                function perfil(){
                    const searchString = $window.sessionStorage.getItem('id');
                    $window.location.assign('#/user/'+searchString);
                }
                function myadvert(){
                    $window.location.assign('#/myadverts');
                }
                function newadvert(){
                    $window.location.assign('#/newadvert');
                }
                
            }
            
})();