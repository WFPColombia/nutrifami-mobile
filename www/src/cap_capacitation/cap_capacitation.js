/*global angular*/
nf2.controller('CapCapacitationCtrl', function ($ionicPlatform, $scope, $ionicLoading, $stateParams, $location, $ionicPopup, UserService, CapacitationService) {
    'use strict';

    $ionicPlatform.ready(function () {
        
        $scope.mids = CapacitationService.getModulesIds($stateParams.capacitation)
        $scope.usuarioActivo = UserService.getUser();

        $scope.modulos = [];
        //Obtenemos los ids de los modulos de la capacitación 3 

        //Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas 
        for (var mid in $scope.mids) {
            var tempModulo = CapacitationService.getModule($scope.mids[mid]);
            tempModulo.disponible = true;
            if (tempModulo.activo === '1') {
                tempModulo.activo = true;
            } else {
                tempModulo.activo = false;
            }
            $scope.modulos.push(tempModulo);
        }

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
                    templateUrl: 'modals/modal.html',
                    scope: $scope,
                    cssClass: 'salir-unidad',
                    buttons: [{
                            text: 'Aceptar',
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
                templateUrl: 'modals/modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: 'Aceptar',
                        type: 'button-positive',
                        onTap: function (e) {
                            console.log("Ok");
                        }
                    }]
            });

        });
    });

});