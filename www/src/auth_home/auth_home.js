nutrifamiMobile.controller('AuthHomeCtrl', function($ionicPlatform, $scope, $ionicViewSwitcher, $location, UserService) {
    'use strict';

    $ionicPlatform.ready(function() {
        $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.

        console.log(UserService.getToken());
        /*if (UserService.isAuthenticated() === true) {
            console.log(UserService.isAuthenticated());
            $location.path('/app/home');
        }*/
        
        

        $scope.abrir = function(enlace) {
            $location.path('/' + enlace);
        };


    });
});