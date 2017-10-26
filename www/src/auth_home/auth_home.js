nutrifamiMobile.controller('AuthHomeCtrl', function($ionicPlatform, $scope, $ionicViewSwitcher, $location, AuthenticationService) {
    'use strict';

    $ionicPlatform.ready(function() {
        $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.

        /*if (UserService.isAuthenticated() === true) {
            console.log(UserService.isAuthenticated());
            $location.path('/app/home');
        }*/

        $scope.usuarioNuevo = {};


        AuthenticationService.ClearCredentials();

        localStorage.removeItem("usuarioActivo");
        localStorage.removeItem("usuarioAvance");
        localStorage.removeItem("usuarioFamilia");
        localStorage.removeItem("usuarioFamiliaAvance");
        localStorage.removeItem("misCompras");

        $scope.abrir = function(enlace) {
            $location.path('/' + enlace);
        };


    });
});