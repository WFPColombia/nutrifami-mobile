nutrifamiMobile.controller('mc_grupoCtrl', function($ionicPlatform, $location, $scope, $ionicLoading, $ionicPopup, $stateParams, ComprasService, UsuarioService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

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
            ComprasService.getConsolidadoComprasUltimoMes(usuario, function(response) {
                if (response.success) {
                    $scope.consumoUltimoMes = response.data;
                    puntoVenta['pid'] = response.puntoVenta;

                    $scope.data = $scope.consumoUltimoMes[$stateParams.grupo - 1];

                    $scope.audios = {
                        'audio4': MediaService.getMediaURL('audios/compras-intro-4.wav'),
                        'feedback': MediaService.getMediaURL($scope.data.feedback.audio)
                    }
                    MediaService.preloadSimple($scope.audios);
                    MediaService.play('feedback', $scope.audios);
                    ComprasService.getProductosPuntoVenta(puntoVenta, function(response) {
                        if (response.success) {
                            $scope.recomendados = response.data[$stateParams.grupo - 1];
                        } else {}
                        $ionicLoading.hide();
                    });
                } else {
                    $scope.negarAcceso();
                }
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




        $scope.playAudio = function(audio) {
            MediaService.play(audio, $scope.audios);
        };

        $scope.$on('$ionicView.enter', function() {
            cargarRecomendados();

        });

        $scope.$on("$ionicView.beforeLeave", function(event, data) {
            console.log("BeforeLeave view");
            MediaService.unload($scope.audios);
        });


    });
});
