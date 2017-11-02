nutrifamiMobile.directive('moduloInfo', function ($location, $rootScope, $ionicLoading, $ionicPopup, $stateParams, $timeout, DescargaService) {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            avance: '='
        },
        templateUrl: 'views/directives/moduloInfo.drt.html',
        link: function ($scope, $element, $attrs) {
            $scope.cargadorTexto = "Preparando archivos para la descarga";
            $scope.cargadorPorcentaje = 0;
            $scope.TARGETPATH = $rootScope.TARGETPATH;

            var optDescarga = {
                template: '<h3>Descargando archivos</h3>{{cargadorTexto}}<h4>{{cargadorPorcentaje}}%</h4>',
                scope: $scope
            };

            $scope.descargado = DescargaService.imagenesDescargadas($scope.info.id);
            $scope.totalLecciones = function () {
                var totalLecciones = 0;
                for (var lid in $scope.info.lecciones) {
                    var tempLeccion = nutrifami.training.getLeccion($scope.info.lecciones[lid]);
                    if (tempLeccion.activo == 1) {
                        totalLecciones++;
                    }
                }
                return (totalLecciones);
            };
            $scope.porcentajeAvance = function () {
                return (100 / $scope.totalLecciones() * $scope.info.avance.leccionesFinalizadas);
            };
            $scope.irAlModulo = function () {
                if ($scope.descargado) {
                    $location.path('/app/' + $stateParams.capacitacion + '/' + $scope.info.id);
                } else {
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

            $rootScope.$on('actualizarCargador', function (event, response) {
                $scope.cargadorTexto = response.mensaje;
                $scope.cargadorPorcentaje = response.porcentaje;
            });

        }
    };
});