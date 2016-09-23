nutrifamiMobile.controller('ProgresoController', function ($ionicPlatform, $scope, $ionicLoading, ComprasService, UsuarioService) {
    'use strict';
    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     END CORDOVA FILES */

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo()
    console.log($scope.usuarioActivo);
    /*$scope.audio = ngAudio.load("audios/compras-intro.mp3");
     $scope.dietaVariada = ngAudio.load("audios/compras-dieta-variada.mp3");*/

    var usuario = {};
    var puntoVenta = {
        'pid': 0
    };
    //usuario.did = $scope.usuarioActivo.login_documento;
    usuario.did = 66976632;

    $scope.cargarMiProgreso = function () {
        $scope.loading = $ionicLoading.show({
            //template: 'Cargando datos...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });

        ComprasService.getConsolidadoComprasUltimoMes(usuario, function (response) {
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

    $scope.cargarMiFamiliaProgreso = function () {
        /*$scope.loading = $ionicLoading.show({
            //template: 'Cargando datos...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });

        ComprasService.getProductosPuntoVenta(puntoVenta, function (response) {
            $ionicLoading.hide();
            if (response.success) {
                $scope.gruposAlimenticios = response.data;
            } else {
                console.log(response.message);
            }

        });*/
    };


    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});