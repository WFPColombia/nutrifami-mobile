nutrifamiMobile.directive('moduloDrt', function ($location, $rootScope, $ionicLoading, $ionicPopup, $stateParams, DescargaService) {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            avance: '='
        },
        templateUrl: 'directives/modulo/modulo.drt.html',
        link: function ($scope) {
            $scope.cargadorTexto = "Preparando archivos para la descarga";
            $scope.cargadorPorcentaje = 0;
            $scope.assetpath = $rootScope.TARGETPATH + $stateParams.capacitacion + "/" + $scope.info.id + "/";
            $scope.icon_descarga = $rootScope.ICON_DESCARGA;
            console.log($rootScope.TARGETPATH + $stateParams.capacitacion + "/" + $scope.info.id + "/");

            var optDescarga = {
                template: '<h3>Descargando archivos</h3>{{cargadorTexto}}<h4>{{cargadorPorcentaje}}%</h4>',
                scope: $scope
            };

            $scope.totalLecciones = function () {
                var totalLecciones = 0;
                for (var lid in $scope.info.lecciones) {
                    var tempLeccion = nutrifami.training.getLeccion($scope.info.lecciones[lid]);
                    if (tempLeccion.activo === 1) {
                        totalLecciones++;
                    }
                }
                return (totalLecciones);
            };
            $scope.porcentajeAvance = function () {
                return (100 / $scope.totalLecciones() * $scope.info.avance.leccionesFinalizadas);
            };

            $scope.paqueteDescargado = function () {
                return DescargaService.paqueteCompletoDescargado('modulos', $scope.info.id);
            };


            $scope.irAlModulo = function () {
                if (DescargaService.paqueteDescargado('modulos', $scope.info.id, 'imagenes')) {
                    $location.path('/app/' + $stateParams.capacitacion + '/' + $scope.info.id);
                } else {

                    if (DescargaService.isOnline()) {
                        $scope.modal = {
                            texto1: '¿Desea descargar el módulo con audios?',
                            texto2: 'Descargar el módulo con audios le permitirá escuchar las lecciones, pero la descarga tomará más tiempo'
                        };
                        $ionicPopup.show({
                            templateUrl: 'views/modals/modal.html',
                            scope: $scope,
                            cssClass: 'salir-unidad',
                            buttons: [{
                                    text: 'Descargar con Audios',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        $scope.descargarPaqueteCompleto();
                                    }
                                }, {
                                    text: 'Descargar sin Audios',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        $scope.descargarPaquete();
                                    }
                                }]
                        });
                    }
                }
            };

            $scope.abrirDescargas = function () {
                $scope.modal = {
                    texto1: '¿Desea descargar el módulo con audios?',
                    texto2: 'Descargar el módulo con audios le permitirá escuchar las lecciones, pero la descarga tomará más tiempo'
                };
                $ionicPopup.show({
                    templateUrl: 'views/modals/modal.html',
                    scope: $scope,
                    cssClass: 'salir-unidad',
                    buttons: [{
                            text: 'Cancelar',
                            type: 'button-positive',
                            onTap: function (e) {
                            }
                        }, {
                            text: 'Descargar módulo',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.descargarPaqueteCompleto();
                            }
                        }]
                });
            };

            $scope.descargarPaqueteCompleto = function () {
                console.log("Descargar todo el modulo");
                $ionicLoading.show(optDescarga);
                DescargaService.descargarPaqueteCompleto('modulos', $scope.info.id);

            };

            $scope.descargarPaquete = function () {
                console.log("Descargar paquete de imagenes");
                $ionicLoading.show(optDescarga);
                DescargaService.descargarPaquete('modulos', $scope.info.id, 'imagenes');
            };

            $scope.$on('actualizarCargador', function (event, response) {
                $scope.cargadorTexto = response.mensaje;
                $scope.cargadorPorcentaje = response.porcentaje;
            });

        }
    };
});