/*global angular*/
nf2.controller('HomeCtrl', function ($ionicPlatform, $scope, $ionicViewSwitcher, $location, $ionicPopup, $ionicLoading, $rootScope, CapacitacionService, DescargaService, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {

        CapacitacionService.initClient();
        $scope.capacitaciones = CapacitacionService.getCapacitacionesActivas();

        //UserService.readAvance();
        
        for (var c in $scope.capacitaciones){
            $scope.capacitaciones[c]['porcentaje'] = getPorcentaje($scope.capacitaciones[c].id);
            console.log();
        }

        console.log($scope.capacitaciones);
        console.log(UserService.getToken());

        $scope.abrirCapacitacion = function (capacitacion) {
            //$location.path('/' + enlace);
            $location.path('/app/' + capacitacion);
        };

        var optDescarga = {
            template: '<h3>Descargando archivos</h3>{{cargadorTexto}}<h4>{{cargadorPorcentaje}}%</h4>',
            scope: $scope
        };
        
        $scope.paqueteDescargado = function (cid){
            return DescargaService.paqueteCompletoDescargado('capacitaciones', cid);
        };

        $scope.descargarCapacitacion = function (cid) {
            $scope.modal = {
                texto1: '¿Desea descargar la capacitación con audios?',
                texto2: 'Descargar la capacitación con audios le permitirá escuchar las lecciones, pero la descarga tomará más tiempo',
                estado: 'alert' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: 'Cancelar',
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }, {
                        text: 'Descargar con audios',
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicLoading.show(optDescarga);
                            DescargaService.descargarPaqueteCompleto('capacitaciones',cid);
                        }
                    }, {
                        text: 'Descargar sin audios',
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicLoading.show(optDescarga);
                            DescargaService.descargarPaquete('capacitaciones',cid, 'imagenes');
                        }
                    }]
            });
        };
        
        function getPorcentaje(cid){
            var avanceCapacitacion = UserService.getAvanceCapacitacion(cid);
            return avanceCapacitacion.porcentaje;
        };

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
        

    });

});