nutrifamiMobile.controller('misComprasGrupoController', function($ionicPlatform, $location, $scope, $ionicLoading, $ionicPopup, $stateParams, ComprasService, UsuarioService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.$on('$ionicView.enter', function() {
            $scope.audios = {
                'audio4': MediaService.getMediaURL('audios/compras-intro-4.wav'),
                'feedback': MediaService.getMediaURL($scope.data.feedback.audio)
            };
            if (typeof $scope.preloadAudios[audio] == 'undefined') {
                MediaService.preloadSimple($scope.audios, function(response) {
                    $scope.preloadAudios = response;
                    MediaService.play(audio, $scope.preloadAudios);
                });
            }
        });

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

        $scope.audios = {
            'audio4': MediaService.getMediaURL('audios/compras-intro-4.wav'),
        };

        $scope.preloadAudios = {};



        var usuario = {};
        var puntoVenta = {
            'pid': 0
        };

        usuario.did = $scope.usuarioActivo.login_documento;
        //usuario.did = '1006330568';
        usuario.nombre = $scope.usuarioActivo.nombre;

        $scope.loading = $ionicLoading.show({
            //template: 'Cargando datos...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });


        var cargarRecomendados = function() {
            ComprasService.getProductosPuntoVenta(puntoVenta, function(response) {
                if (response.success) {
                    $scope.recomendados = response.data[$stateParams.grupo - 1];
                } else {}
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


        ComprasService.getConsolidadoComprasUltimoMes(usuario, function(response) {
            if (response.success) {
                $scope.consumoUltimoMes = response.data;
                puntoVenta['pid'] = response.puntoVenta;

                $scope.data = $scope.consumoUltimoMes[$stateParams.grupo - 1];

                $scope.audios['feedback'] = MediaService.getMediaURL($scope.data.feedback.audio);

                MediaService.preloadSimple($scope.audios, function(response) {
                    $scope.preloadAudios = response;
                    MediaService.play(audio, $scope.preloadAudios);
                });


                /*$scope.audios = {
                    'resumenCompras': 'audios/compras-resumen-' + $scope.grupo.grupo_id + '.mp3',
                    'compraIdeal': 'audios/compra-ideal.mp3'
                };*/
                cargarRecomendados();
            } else {
                $scope.negarAcceso();
            }
        });


        $scope.stopAudio = function() {
            MediaService.unload($scope.preloadAudios, function() {
                $scope.preloadAudios = {};
            });
        }

        $scope.playAudio = function(audio) {

            MediaService.play(audio, $scope.preloadAudios);

        };


    });
});
