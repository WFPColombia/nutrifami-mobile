nutrifamiLogin.controller('HomeController', function ($ionicPlatform, $scope, $ionicLoading, AuthenticationService, $timeout, $cordovaNativeAudio) {
    'use strict';

    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     
     END CORDOVA FILES */
    $scope.$on('$ionicView.loaded', function (event) {
        console.log(event);
    });


    $scope.mensaje = "Bienvenido al home";
    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});
