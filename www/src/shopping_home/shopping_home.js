nf2.controller('ShoppingHomeCtrl', function ($ionicPlatform, $scope, $ionicLoading, $ionicPopup, $state, $timeout, ShoppingService, UserService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.audios = {
            audio3: MediaService.getMediaURL('audios/compras-intro-3.wav')
        };
        $scope.usuarioActivo = UserService.getUser();
        $scope.animar = false;


        //$scope.usuarioActivo.username = '1006330568';

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

        $scope.cargarCompras = function () {
            $scope.loading = $ionicLoading.show({
                template: '<p>Cargando datos ...</p><p>Espere un momento</p><p>Este proceso puede tardar!!</p>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            ShoppingService.getConsolidadoComprasUltimoMes($scope.usuarioActivo, function (response) {
                console.log(response);
                if (response) {
                    $scope.consumoUltimoMes = response;

                    $timeout(function () {
                        $scope.animar = true;
                    }, 1500);
                } else {
                    $scope.negarAcceso();
                }
                $ionicLoading.hide();
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

        $scope.$on("$ionicView.enter", function (event, data) {
            console.log("Enter View");
            MediaService.preloadSimple($scope.audios);
        });

        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            console.log("BeforeLeave view");
            MediaService.unload();
        });

        $scope.cargarCompras();

    });
});
