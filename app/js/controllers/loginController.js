nutrifamiLogin.controller('LoginController', function ($ionicPlatform, $scope, $ionicLoading, AuthenticationService, $timeout, $cordovaNativeAudio, $location) {
    'use strict';

    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     AndroidFullScreen.immersiveMode();
     $cordovaNativeAudio.preloadSimple('audiologin', 'audios/login.mp3');
     END CORDOVA FILES */



    AuthenticationService.ClearCredentials();
    localStorage.clear();

    $scope.login = function () {

        // Show the loading overlay and text
        $scope.loading = $ionicLoading.show({
            // The text to display in the loading indicator
            //template: 'Cargando...',
            // The animation to use
            animation: 'fade-in',
            // Will a dark overlay or backdrop cover the entire view
            showBackdrop: true,
            // The maximum width of the loading indicator
            // Text will be wrapped if longer than maxWidth
            maxWidth: 40
        });

        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password, response.message);
                $ionicLoading.hide();
                $location.path('/intro');
            } else {
                $scope.error = response.message;
                $timeout(function () {
                    $scope.error = "";
                }, 3000);
                $ionicLoading.hide();
            }
        });
    };

    $scope.playAudio = function () {
        $cordovaNativeAudio.play('audiologin');
    };
    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});
