nutrifamiMobile.directive('moduloDrt', function ($location, $rootScope, $ionicLoading, $ionicPopup, $stateParams, DescargaService) {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            avance: '='
        },
        templateUrl: 'directives/modulo/modulo.html',
        link: function ($scope) {
            $scope.cargadorTexto = "Preparando archivos para la descarga";
            $scope.cargadorPorcentaje = 0;
            $scope.assetpath = $rootScope.TARGETPATH + $scope.info.id + "/";

            var optDescarga = {
                template: '<h3>Descargando archivos</h3>{{cargadorTexto}}<h4>{{cargadorPorcentaje}}%</h4>',
                scope: $scope
            };

            $scope.imagenesDescargadas = DescargaService.imagenesDescargadas($scope.info.id);
            $scope.audiosDescargados = DescargaService.audiosDescargados($scope.info.id);
            $scope.descarga = $scope.imagenesDescargadas && $scope.audiosDescargados;

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
            $scope.irAlModulo = function () {
                if ($scope.imagenesDescargadas) {
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
                                        $scope.descargarTodo();
                                    }
                                }, {
                                    text: 'Descargar sin Audios',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        $scope.descargarImagenes();
                                    }
                                }]
                        });
                    }
                }
            };

            $scope.descargarTodo = function () {
                console.log("Descargar todo");
                $ionicLoading.show(optDescarga);
                DescargaService.descargarModulo($scope.info.id);

            };

            $scope.descargarImagenes = function () {
                console.log("Descargar imagenes");
                $ionicLoading.show(optDescarga);
                DescargaService.descargarImagenes($scope.info.id);
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
                            text: 'Descargar capacitación',
                            type: 'button-positive',
                            onTap: function (e) {
                                $scope.descargarTodo();
                            }
                        }]
                });
            }

            $rootScope.$on('actualizarCargador', function (event, response) {
                $scope.cargadorTexto = response.mensaje;
                $scope.cargadorPorcentaje = response.porcentaje;
            });

        }
    };
});