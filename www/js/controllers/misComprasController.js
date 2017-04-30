nutrifamiMobile.controller('misComprasController', function($ionicPlatform, $scope, $rootScope, $ionicHistory, $ionicLoading, $ionicPopup, $ionicViewSwitcher, $state, $location, $timeout, ComprasService, UsuarioService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo()
        $scope.animar = false;
        $scope.preloadAudios = {};



        var usuario = {};

        $scope.consumoUltimoMes = [{
            'nombre': "Cereales, raíces, tubérculos y plátanos.",
            'porcentaje_compra': 0,
            'grupo_id': '1'
        }, {
            'nombre': "Carnes, huevos y leguminosas secas.",
            'porcentaje_compra': 0,
            'grupo_id': '2'

        }, {
            'nombre': "Leches y otros productos lácteos.",
            'porcentaje_compra': 0,
            'grupo_id': '3'
        }, {
            'nombre': "Frutas y verduras.",
            'porcentaje_compra': 0,
            'grupo_id': '4'
        }, {
            'nombre': "Grasas.",
            'porcentaje_compra': 0,
            'grupo_id': '5'
        }, {
            'nombre': "Azucar.",
            'porcentaje_compra': 0,
            'grupo_id': '6'
        }];

        usuario.did = $scope.usuarioActivo.login_documento;
        //usuario.did = '1006330568';

        $scope.cargarCompras = function() {
            $scope.loading = $ionicLoading.show({
                //template: 'Cargando datos...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            ComprasService.getConsolidadoComprasUltimoMes(usuario, function(response) {
                $scope.noHayDatos = false;
                if (response.success) {
                    $scope.consumoUltimoMes = response.data;

                    $timeout(function() {
                        $scope.animar = true;
                    }, 1500);
                } else {
                    $scope.negarAcceso();
                }
                $ionicLoading.hide();
            });
        };

        $scope.negarAcceso = function() {

            var negarPopUp = $ionicPopup.alert({
                title: '',
                template: 'No hay información de compras para este usuario',
                buttons: [
                    { text: 'Salir' }
                ]

            });

            negarPopUp.then(function(res) {
                $location.path('/app/mis-compras/intro');
            });

        };

        $scope.cargarCompras();

        $scope.stopAudio = function() {
            MediaService.unload($scope.preloadAudios, function() {
                $scope.preloadAudios = {};
            });
        }

        $scope.playAudio = function(audio) {
            $scope.audios = {
                'audio3': MediaService.getMediaURL('audios/compras-intro-3.wav'),
            };

            if (typeof $scope.preloadAudios[audio] == 'undefined') {
                MediaService.preloadSimple($scope.audios, function(response) {
                    $scope.preloadAudios = response;
                    MediaService.play(audio, $scope.preloadAudios);
                });
            } else {
                MediaService.play(audio, $scope.preloadAudios);

            }
        };

        $rootScope.$ionicGoBack = function(backCount) {
            MediaService.unload($scope.preloadAudios, function() {
                $scope.preloadAudios = {};
                $ionicHistory.goBack(backCount);

            });
        };
    });
});
