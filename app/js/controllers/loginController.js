nutrifamiLogin.controller('LoginController', function ($ionicPlatform, $scope, $rootScope, $cordovaKeyboard, $ionicLoading, AuthenticationService, $timeout, AudioService, $location) {
    'use strict';

    $ionicPlatform.ready(function () {

        $scope.audios = {
            'audiologin': 'audios/login.mp3'
        };

        AudioService.preloadSimple($scope.audios);

        AuthenticationService.ClearCredentials();
        localStorage.clear();

        $scope.$watch(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                return $cordovaKeyboard.isVisible();
            }
            console.log("Si1");
        }, function (value) {
            $scope.keyboardOpen = value;
            console.log(value);
        });

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
                    AudioService.unload($scope.audios);
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

        $scope.playAudio = function (audio) {
            AudioService.play(audio, $scope.audios);
        };
    });
});
