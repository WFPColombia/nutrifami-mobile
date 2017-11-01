nutrifamiMobile.controller('AuthHomeCtrl', function($ionicPlatform, $scope, $ionicViewSwitcher, $location, UserService) {
    'use strict';

    $ionicPlatform.ready(function() {
        
        $scope.usuarioNuevo = {};

        UserService.logOut();
        $scope.abrir = function(enlace) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/auth/' + enlace);
        };

    });
});