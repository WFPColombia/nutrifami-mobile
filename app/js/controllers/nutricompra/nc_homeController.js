/*global angular*/
nutrifamiMobile.controller('nc_homeController', function($scope, $location, $ionicViewSwitcher, UsuarioService) {
    'use strict';



    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

    $scope.salir = function() {

        $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
        $location.path('/app/capacitacion');

    }

});
