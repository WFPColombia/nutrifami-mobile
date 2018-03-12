/*global angular*/
nf2.controller('CapCapacitationCtrl', function ($ionicPlatform, $scope, $ionicLoading, $stateParams, $location, $filter, $ionicPopup, UserService, CapacitationService) {
    'use strict';

    $ionicPlatform.ready(function () {
        
        $scope.usuarioActivo = UserService.getUser();
        $scope.modulos = CapacitationService.getModulesActives($stateParams.capacitation);

        $scope.$on('descargaTerminada', function (event, id) {
            $ionicLoading.hide();
            $location.path('/app/' + $stateParams.capacitation + '/' + id);
        });
                
        $scope.$on('errorDescarga', function (event, mensaje) {
            $ionicLoading.hide();
            $scope.modal = {
                    texto1: mensaje,
                    texto2: "Verifique la conexión a Internet e inténtelo más tarde",
                    estado: 'error' // ok, alert, error
                };
                $ionicPopup.show({
                    templateUrl: 'modals/simple/simple.modal.html',
                    scope: $scope,
                    cssClass: 'salir-unidad',
                    buttons: [{
                            text: $filter('translate')('Aceptar'),
                            type: 'button-positive',
                            onTap: function (e) {
                            }
                        }]
                });
        });


        $scope.$on('errorConexion', function (event, response, mid) {
            console.log('Error de conexión');
            console.log(event);
            $ionicLoading.hide();

            $scope.modal = {
                texto1: 'Sin conexión a Internet',
                texto2: 'Este módulo no se encuentra disponible sin conexión a Internet',
                estado: 'alert' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/simple/simple.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: $filter('translate')('Aceptar'),
                        type: 'button-positive',
                        onTap: function (e) {
                            console.log("Ok");
                        }
                    }]
            });

        });
    });

});