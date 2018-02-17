/*global angular*/
nf2.controller('nc_jugarController', function($scope, $location, $ionicPopup, $ionicViewSwitcher, UserService, NutricompraService) {
    'use strict';



   $scope.usuarioActivo = UserService.getUser();
    $scope.pagina = 1;

    $scope.nutricompra = true;

    var categorias = [
        'azucares', 'carnes', 'cereal', 'frutas', 'grasas', 'inadecuados', 'leche'

    ];

    $scope.productosVitrina = [];

    actualizarProductos();


    $scope.verResumen = function() {
        $location.path('/nutricompra/jugar/resumen');

    };

    $scope.agregarProductoAlCarrito = function(grupo, id_producto, index) {
        NutricompraService.addProductoAlCarrito(grupo, id_producto, index, function(response) {
            actualizarProductos();
            if ($scope.cantidadProductosCarrito == 15) {
                $location.path('/nutricompra/jugar/terminar');
            }
        });

    }

    $scope.paginaSiguiente = function() {
        $scope.pagina++;
    }

    $scope.paginaAnterior = function() {
        $scope.pagina--;
    }

    /*$scope.salir = function() {
        var data = {
            texto1: '¿Está seguro de salir?',
            texto2: 'Si sale perderá todo el progreso del juego',
            boton1: 'Continuar',
            enlace1: '',
            boton2: 'Salir',
            enlace2: 'nutricompra'
        };

        var modalInstance = $uibModal.open({
            animation: true,
            windowClass: 'nutricompra-salir',
            templateUrl: 'views/nutricompra/nc_salir.modal.html',
            controller: 'nc_salirModalController',
            keyboard: false,
            size: 'sm',
            backdrop: 'static',
            resolve: {
                data: function() {
                    return data;
                }
            }

        });


    };*/

    $scope.salir = function() {
        $scope.data = {
            texto1: '¿Está seguro de salir?',
            texto2: 'Si sale perderá todo el progreso del juego',
            boton1: 'Continuar',
            enlace1: '',
            boton2: 'Salir',
            enlace2: 'nutricompra'
        };


        var popUpFeedback = $ionicPopup.show({
            templateUrl: 'views/nutricompra/nc_salir.modal.html',
            scope: $scope,
            cssClass: 'salir-unidad',
            buttons: [{
                text: $scope.data.boton1,
                type: 'button-positive',
                onTap: function(e) {

                    $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                    if ($scope.data.enlace1 != '') {
                        NutricompraService.clearProductos(function(response) {
                            $location.path('/' + $scope.data.enlace1);
                        });
                    }
                }
            }, {
                text: $scope.data.boton2,
                type: 'button-positive',
                onTap: function(e) {
                    $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                    if ($scope.data.enlace2 != '') {
                        NutricompraService.clearProductos(function(response) {
                            $location.path('/' + $scope.data.enlace2);
                        });
                    }
                }
            }]
        });
    }

    function actualizarProductos() {
        NutricompraService.getProductos(function(response) {
            $scope.productosVitrina = response.productosVitrina;
            $scope.productosCarrito = response.productosCarrito;
            $scope.cantidadProductosCarrito = response.cantidadProductosCarrito

            console.log($scope.productosCarrito);
        });
    }






});
