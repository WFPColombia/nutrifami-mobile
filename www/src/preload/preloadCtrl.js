/*global angular*/
nutrifamiMobile.controller('PreloadCtrl', function ($ionicPlatform, $ionicPopup, $scope, $location, UserService, DescargaService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.cargadorTexto = "Estamos preparando Nutrifami. Por favor espera un momento";
        $scope.cargadorPorcentaje = 0.0;
        
        console.log(UserService.getVersionApp());
        
        if (window.cordova) {
            window.plugins.insomnia.keepAwake(function () {
                console.log("inmsonia ok");
            }, function () {
                console.log("insomnia error");
            });
        }

        //Verificar el destino
        var destino = "/auth";
        var puedeEntrar = false;
        if (UserService.getUser() != null) {
            puedeEntrar = true;
            destino = '/app/';
        }
        
        if(UserService.getVersionApp() == null || UserService.getVersionApp() != 2){
            var destino = "/auth";
        }

        function initClient() {
            if (DescargaService.isOnline()) {
                DescargaService.hayNuevaVersion(function (response) {
                    if (response) {
                        console.log("Existe una nueva versión de la capacitación");
                        DescargaService.actualizarCapacitacion(function () {
                            UserService.readAvance();
                            DescargaService.descargaInicial();
                        });
                    } else {
                        console.log("Capacitación actualizada");
                        $location.path(destino);
                    }
                });
            } else {
                if (puedeEntrar) {
                    $scope.modal = {
                        texto1: 'Sin conexión a Internet',
                        texto2: 'Podrá usar Nutrifami sin Conexión a Internet, pero los cambios no serán guardados'
                    };
                    $scope.buttonsModal = [{
                            text: 'Continuar',
                            type: 'button-positive',
                            onTap: function (e) {
                                $location.path('/app/');
                            }
                        }];
                } else {
                    $scope.modal = {
                        texto1: 'Sin conexión a Internet',
                        texto2: 'Para poder usar Nutrifami sin Conexión a Internet, Debe haber iniciado sesión al menos una vez y haber descargado las capacitaciones'
                    };
                    $scope.buttonsModal = [{
                            text: 'Salir',
                            type: 'button-positive',
                            onTap: function (e) {
                                ionic.Platform.exitApp();
                            }
                        }];
                }
                $ionicPopup.show({
                    templateUrl: 'modals/modal.html',
                    scope: $scope,
                    cssClass: 'salir-unidad',
                    buttons: $scope.buttonsModal
                });
            }
        }

        $scope.$on('errorDescarga', function (event, mensaje) {
            $scope.modal = {
                    texto1: mensaje,
                    texto2: "Verifique la conexión a Internet e inténtelo más tarde"
                };
                $ionicPopup.show({
                    templateUrl: 'views/modals/modal.html',
                    scope: $scope,
                    cssClass: 'salir-unidad',
                    buttons: [{
                            text: 'Aceptar',
                            type: 'button-positive',
                            onTap: function (e) {
                                ionic.Platform.exitApp();
                            }
                        }]
                });
        });
        
        $scope.$on('descargaTerminada', function (event, id) {
            $location.path(destino);
        });
        
        $scope.$on('actualizarCargador', function (event, response) {
                $scope.cargadorTexto = response.mensaje;
                $scope.cargadorPorcentaje = response.porcentaje;
            });
        
        
        initClient();
    });
});