/*global angular*/
nf2.controller('CapHomeCtrl', function ($ionicPlatform, $scope, $ionicViewSwitcher, $state, $location, $ionicPopup, $ionicLoading, $filter, CapacitationService, DownloadService, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {

        $scope.capacitations = CapacitationService.getCapacitationsActives();

        for (var c in $scope.capacitations) {
            $scope.capacitations[c]['porcentaje'] = getPorcentaje($scope.capacitations[c].id);
            $scope.capacitations[c].visible = false;

            try {
                if ($scope.capacitations[c].status.nombre === 'publico') {
                    $scope.capacitations[c].visible = true;
                } else {
                    for (var g in $scope.user.groups) {
                        if ($scope.user.groups[g].name === 'creator' && $scope.capacitations[c].status.nombre === 'borrador') {
                            $scope.capacitations[c].visible = true;
                        }

                        if ($scope.user.groups[g].name === 'reviser' && $scope.capacitations[c].status.nombre === 'revision') {
                            $scope.capacitations[c].visible = true;
                        }
                    }
                }

            } catch (err) {
                console.log('Hubo error');
                console.log(err);
                localStorage.removeItem("version");
                
                UserService.logOut();
                $state.go('preload');

            }


        }

        var optDescarga = {
            template: "<h3>{{'Descargando archivos necesarios!' | translate }}</h3>{{cargadorTexto | translate }}<h4>{{cargadorPorcentaje}}%</h4>",
            scope: $scope
        };

        $scope.paqueteDescargado = function (cid) {
            return DownloadService.paqueteCompletoDescargado('capacitaciones', cid);
        };

        $scope.descargarCapacitacion = function (cid) {
            $scope.modal = {
                texto1: '¿Desea descargar la capacitación con audios?',
                texto2: 'Descargar la capacitación con audios le permitirá escuchar las lecciones, pero la descarga tomará más tiempo',
                estado: 'alert' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/simple/simple.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: $filter('translate')('Cancelar'),
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }, {
                        text: $filter('translate')('Descargar con audios'),
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicLoading.show(optDescarga);
                            DownloadService.descargarPaqueteCompleto('capacitaciones', cid);
                        }
                    }, {
                        text: $filter('translate')('Descargar sin audios'),
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicLoading.show(optDescarga);
                            DownloadService.descargarPaquete('capacitaciones', cid, 'imagenes');
                        }
                    }]
            });
        };

        function getPorcentaje(cid) {
            var avanceCapacitacion = UserService.getAvanceCapacitacion(cid);

            if (avanceCapacitacion) {
                return avanceCapacitacion.porcentaje;
            } else {
                return 0;
            }
        }
        ;

        $scope.irABuscar = function () {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/buscar');
        };

        $scope.$on('descargaTerminada', function (event, id) {
            $ionicLoading.hide();
            $location.path('/app/' + id);
        });

        $scope.$on('actualizarCargador', function (event, response) {
            $scope.cargadorTexto = response.mensaje;
            $scope.cargadorPorcentaje = response.porcentaje;
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


    });

});