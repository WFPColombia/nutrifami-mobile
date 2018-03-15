/*global angular*/
nf2.controller('ncPlayCtrl', function ($ionicPlatform, $scope, $state, $ionicPopup, $ionicViewSwitcher, $filter, UserService, NutricompraService) {
    'use strict';

    $ionicPlatform.ready(function () {
        $scope.usuarioActivo = UserService.getUser();
        $scope.pagina = 1;

        $scope.nutricompra = true;

        $scope.productosVitrina = [];

        actualizarProductos();

        $scope.agregarProductoAlCarrito = function (grupo, id_producto, index) {
            NutricompraService.addProductoAlCarrito(grupo, id_producto, index, function (response) {
                actualizarProductos();
                if ($scope.cantidadProductosCarrito >= 15) {
                    $state.go('nc_end');
                }
            });

        };

        $scope.paginaSiguiente = function () {
            $scope.pagina++;
        };

        $scope.paginaAnterior = function () {
            $scope.pagina--;
        };

        $scope.salir = function () {
            $scope.data = {
                texto1: '¿Estás seguro de salir?',
                texto2: 'Si sale perderá el progreso'
            };


            var popUpFeedback = $ionicPopup.show({
                templateUrl: 'modals/nc_exit/nc_exit.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: $filter('translate')('Salir'),
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                            $state.go('nf.cap_home');
                        }
                    }, {
                        text: $filter('translate')('Continuar'),
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }]
            });
        };

        function actualizarProductos() {
            NutricompraService.getProductos(function (response) {
                $scope.productosVitrina = response.productosVitrina;
                $scope.productosCarrito = response.productosCarrito;
                $scope.cantidadProductosCarrito = response.cantidadProductosCarrito;
                console.log($scope.productosVitrina);
            });
        }


    });
});
