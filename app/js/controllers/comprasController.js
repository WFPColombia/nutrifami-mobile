nutrifamiMobile.controller('ComprasController', function($ionicPlatform, $scope, $ionicLoading, $ionicViewSwitcher, $state, ComprasService, UsuarioService, AudioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo()
        console.log($scope.usuarioActivo);

        $scope.audios = {
            'audio1': 'audios/compras-intro.mp3',
            'audio2': 'audios/compras-dieta-variada.mp3'
        };
        AudioService.preloadSimple($scope.audios);


        var usuario = {};
        var puntoVenta = {
            'pid': 0
        };
        usuario.did = $scope.usuarioActivo.login_documento;
        //usuario.did = 66976632;

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
                    puntoVenta['pid'] = response.puntoVenta;
                } else {
                    $scope.noHayDatos = true;
                    console.log(response.message);
                }
                $ionicLoading.hide();
            });
        };



        $scope.cargarRecomendados = function() {
            console.log(puntoVenta);
            $scope.loading = $ionicLoading.show({
                //template: 'Cargando datos...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            ComprasService.getProductosPuntoVenta(puntoVenta, function(response) {
                $ionicLoading.hide();
                if (response.success) {
                    $scope.gruposAlimenticios = response.data;
                } else {
                    console.log(response.message);
                }

            });
        };

        $scope.gruposAlimenticios = [];

        $scope.stopAudio = function() {
            AudioService.stopAll($scope.audios);
        }


        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        $scope.playAudio = function(audio) {
            AudioService.stopAll($scope.audios);
            AudioService.play(audio);
        };



    });
});
