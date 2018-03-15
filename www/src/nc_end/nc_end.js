/*global angular*/
nf2.controller('ncEndCtrl', function ($ionicPlatform, $scope, $state, $filter, $ionicPopup, $ionicViewSwitcher, UserService, NutricompraService) {
    'use strict';

    $ionicPlatform.ready(function () {
        $scope.usuarioActivo = UserService.getUser();
        $scope.feedbacks = {};


        NutricompraService.getFeedback(function (response) {
            $scope.feedbacks = response;
        });

        $scope.salir = function () {
            $scope.data = {
                texto1: '¿Quiere jugar de Nuevo?',
                texto2: 'Podrá seguir practicando para hacer una compra saludable'
            };

            $ionicPopup.show({
                templateUrl: 'modals/nc_exit/nc_exit.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text:  $filter('translate')('Jugar'),
                        type: 'button-positive',
                        onTap: function (e) {

                            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                            $state.go('nc_home');
                        }
                    }, {
                        text: $filter('translate')('Salir'),
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                            $state.go('nf.cap_home');
                        }
                    }]
            });
        };
    });
});
