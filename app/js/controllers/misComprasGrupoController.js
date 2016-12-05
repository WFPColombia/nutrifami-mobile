nutrifamiMobile.controller('misComprasGrupoController', function($ionicPlatform, $location, $scope, $ionicLoading, $ionicPopup, $stateParams, ComprasService, UsuarioService, AudioService) {
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
                AudioService.unload($scope.audios);
                $location.path('/app/mis-compras/intro');
            });

        };

        ComprasService.getConsolidadoComprasUltimoMes(usuario, function(response) {
            if (response.success) {
                $scope.consumoUltimoMes = response.data;
                console.log($scope.consumoUltimoMes);
                puntoVenta['pid'] = response.puntoVenta;

                $scope.data = $scope.consumoUltimoMes[$stateParams.grupo - 1];

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
            AudioService.stopAll($scope.audios);
        }

        $scope.playAudio = function(audio) {
            AudioService.stopAll($scope.audios);
            AudioService.play(audio);
        };


    });
});
