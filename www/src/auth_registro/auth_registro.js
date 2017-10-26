nutrifamiMobile.controller('AuthRegistroCtrl', function($ionicPlatform, $scope, $rootScope, $ionicViewSwitcher, $location, UserService) {
    'use strict';

    $ionicPlatform.ready(function() {


        console.log("Registro!!");

        console.log(UserService.isAuthenticated());

        /*if (UserService.isAuthenticated()) {
            $location.path('/app/search');
        }*/

        $scope.authenticate = function(provider) {
            UserService.authenticate(provider);
        };

        $rootScope.$on('userLoggedIn', function(data) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/search');

        });

        // will fire in case authentication failed
        $rootScope.$on('userFailedLogin', function() {
            console.log("Error al iniciar sesión");

        });


    });
});