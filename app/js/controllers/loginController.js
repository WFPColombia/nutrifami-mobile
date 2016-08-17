nutrifamiLogin.controller('LoginController', ['$scope', '$location', 'AuthenticationService', 'ngAudio',
    function ($scope, $location, AuthenticationService, ngAudio) {
        'use strict';

        /* BEGIN CORDOVA FILES
         document.addEventListener('deviceready', function () {
         AndroidFullScreen.immersiveMode();
         END CORDOVA FILES */

        /*Cargamos el audio de ayuda*/
        $scope.audio = ngAudio.load("audios/login.mp3");

        AuthenticationService.ClearCredentials();
        localStorage.clear();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response.message);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */
    }]);
