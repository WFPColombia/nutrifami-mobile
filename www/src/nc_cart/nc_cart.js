/*global angular*/
nf2.controller('ncCartCtrl', function ($scope, $ionicPlatform, UserService, NutricompraService) {
    'use strict';
    $ionicPlatform.ready(function () {
        $scope.usuarioActivo = UserService.getUser();
        $scope.nutricompra = true;
        actualizarProductos();
        $scope.quitarProducto = function (grupo, index) {
            NutricompraService.removerProductoAlCarrito(grupo, index, function (response) {
                actualizarProductos();
            });
        };

        function actualizarProductos() {
            NutricompraService.getProductos(function (response) {
                $scope.productosVitrina = response.productosVitrina;
                $scope.productosCarrito = response.productosCarrito;
                $scope.cantidadProductosCarrito = response.cantidadProductosCarrito;
                console.log($scope.productosCarrito);
            });

            NutricompraService.getFeedback(function (response) {
            });
        }

    });
});
