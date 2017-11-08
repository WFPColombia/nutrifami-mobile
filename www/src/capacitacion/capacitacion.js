/*global angular*/
nutrifamiMobile.controller('CapacitacionCtrl', function ($ionicPlatform, $scope, $rootScope, $ionicLoading, $stateParams, $location, $ionicPopup, UsuarioService, CapacitacionService) {
    'use strict';

    $ionicPlatform.ready(function () {

        CapacitacionService.initClient();
        $scope.mids = CapacitacionService.getModulosId($stateParams.capacitacion)
        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.usuarioAvance = UsuarioService.getUsuarioAvance();

        $scope.modulos = [];

        //Obtenemos los ids de los modulos de la capacitación 3 

        //Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas 
        for (var mid in $scope.mids) {
            var tempModulo = CapacitacionService.getModulo($scope.mids[mid]);
            tempModulo.avance = {};
            tempModulo.avance.finalizado = false;
            tempModulo.disponible = true;
            if (tempModulo.activo == '1') {
                tempModulo.activo = true;
            } else {
                tempModulo.activo = false;
            }

            if (typeof $scope.usuarioAvance['3'] !== 'undefined' && typeof $scope.usuarioAvance['3'][$scope.mids[mid]] !== 'undefined') {
                tempModulo.avance.leccionesFinalizadas = Object.keys($scope.usuarioAvance['3'][$scope.mids[mid]]).length;
                if (CapacitacionService.getLeccionesActivas(tempModulo.id).length == tempModulo.avance.leccionesFinalizadas) {
                    tempModulo.avance.finalizado = true;
                }
            } else {
                tempModulo.avance.leccionesFinalizadas = 0;
            }
            $scope.modulos.push(tempModulo);

        }

        $scope.modulos[0].disponible = true;
        for (var i in $scope.modulos) {
            if (i != 0) {
                var temp = i - 1;
                if ($scope.modulos[i].avance.finalizado) {
                    $scope.modulos[i].disponible = true;
                } else if ($scope.modulos[i].avance.leccionesFinalizadas > 0) {
                    $scope.modulos[i].disponible = true;
                } else if ($scope.modulos[temp].avance.finalizado) {
                    $scope.modulos[i].disponible = true;
                }
            }

        }

        $rootScope.$on('descargaTerminada', function (event, response, mid) {
            console.log(event);
            $ionicLoading.hide();
            if (response) {
                $location.path('/app/' + $stateParams.capacitacion + '/' + mid);

            } else {
                $scope.modal = {
                    texto1: 'Hubo un error en la descarga del módulo',
                    texto2: 'Intentanlo nuevamente'
                };
                $ionicPopup.show({
                    templateUrl: 'views/modals/modal.html',
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
            }
        });


        $rootScope.$on('errorConexion', function (event, response, mid) {
            console.log('Error de conexión');
            console.log(event);
            $ionicLoading.hide();

            $scope.modal = {
                texto1: 'Sin conexión a Internet',
                texto2: 'Este módulo no se encuentra disponible sin conexión a Internet'
            };
            $ionicPopup.show({
                templateUrl: 'views/modals/modal.html',
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