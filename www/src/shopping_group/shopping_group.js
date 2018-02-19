nf2.controller('ShoppingGroupCtrl', function ($ionicPlatform, $state, $scope, $ionicLoading, $ionicPopup, $stateParams, ShoppingService, UserService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.usuarioActivo = UserService.getUser();

        console.log('ShoppingGroupCtrl');

        var usuario = {};

        usuario.did = $scope.usuarioActivo.documento;
        //usuario.did = '1006330568';
        usuario.nombre = $scope.usuarioActivo.nombre;

        $scope.loading = $ionicLoading.show({
            //template: 'Cargando datos...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });


        var cargarRecomendados = function () {
            ShoppingService.getConsolidadoComprasUltimoMes(usuario, function (response) {
                if (response) {
                    $scope.consumoUltimoMes = response;

                    $scope.data = $scope.consumoUltimoMes[$stateParams.group - 1];

                    $scope.audios = {
                        audio4: MediaService.getMediaURL('audios/compras-intro-4.wav'),
                        feedback: MediaService.getMediaURL($scope.data.feedback.audio)
                    };
                    MediaService.preloadSimple($scope.audios);
                    MediaService.play('feedback');
                    ShoppingService.getProductosPuntoVenta(function (response) {
                        console.log(response);
                        if (response) {
                            console.log(response)
                            $scope.recomendados = response[$stateParams.group];
                            console.log($scope.recomendados);
                        } else {
                        }
                        $ionicLoading.hide();
                    });
                } else {
                    $scope.negarAcceso();
                }
            });

        };

        $scope.negarAcceso = function () {
            $scope.modal = {
                texto1: 'No hay información de compras para este usuario',
                texto2: '',
                estado: 'alert' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: 'Salir',
                        type: 'button-positive',
                        onTap: function (e) {
                            $state.go('nf.shopping_intro');
                        }
                    }]
            });
        };

        $scope.playAudio = function (audio) {
            MediaService.play(audio);
        };

        cargarRecomendados();

        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            console.log("BeforeLeave view");
            MediaService.unload();
        });


    });
});
