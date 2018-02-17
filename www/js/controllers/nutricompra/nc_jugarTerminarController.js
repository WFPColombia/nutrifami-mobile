/*global angular*/
nf2.controller('nc_jugarTerminarController', function($scope, $location, $ionicPopup, $ionicViewSwitcher, UserService, NutricompraService) {
    'use strict';




    $scope.usuarioActivo = UserService.getUser();
    $scope.feedbacks = {}


    NutricompraService.getFeedback(function(response) {

        $scope.feedbacks = response;
    });


    $scope.nutricompra = true;


    $scope.salir = function() {

        var data = {
            texto1: '¿Quiere jugar de Nuevo?',
            texto2: 'Podrá seguir practicando para hacer una compra saludable',
            boton1: 'Jugar',
            enlace1: 'nutricompra',
            boton2: 'Salir',
            enlace2: 'capacitacion'
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


    };

    $scope.salir = function() {
        $scope.data = {
            ttexto1: '¿Quiere jugar de Nuevo?',
            texto2: 'Podrá seguir practicando para hacer una compra saludable',
            boton1: 'Jugar',
            enlace1: 'nutricompra',
            boton2: 'Salir',
            enlace2: 'capacitacion'
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

});
