/*global angular*/
nutrifamiMobile.controller('nc_homeController', function($scope, $location, $ionicViewSwitcher, UserService) {
    'use strict';



    $scope.usuarioActivo = UserService.getUser();

    $scope.salir = function() {

        $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
        $location.path('/app/capacitacion');

    }

});
