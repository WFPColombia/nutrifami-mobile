nutrifamiLogin.controller('LoginController', function($ionicPlatform, $scope, $rootScope, $cordovaKeyboard, $ionicLoading, AuthenticationService, $timeout, AudioService, $location, $ionicPopup, PerfilService) {
    'use strict';

    $ionicPlatform.ready(function() {

        $scope.audios = {
            'audiologin': 'audios/login.mp3'
        };

        $scope.usuarioNuevo = {};

        AudioService.preloadSimple($scope.audios);

        AuthenticationService.ClearCredentials();
        localStorage.clear();

        $scope.$watch(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                return $cordovaKeyboard.isVisible();
            }
            //console.log("Scroll");
        }, function(value) {
            $scope.keyboardOpen = value;
            //console.log(value);
        });

        $scope.login = function() {

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
            AuthenticationService.Login($scope.username, 'no-pass', function(response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response.message);
                    $ionicLoading.hide();
                    AudioService.unload($scope.audios);
                    $location.path('/intro');
                } else {
                    $scope.error = response.message;
                    $timeout(function() {
                        $scope.error = "";
                    }, 3000);
                    $ionicLoading.hide();
                }
            });
        };

        $scope.abrirRegistro = function() {

            $scope.popUpAgregarFamiliar = $ionicPopup.show({
                templateUrl: 'views/template/registro.tpl.html',
                scope: $scope,
                cssClass: 'registro'
            });

        }

        $scope.registro = function() {

            $scope.loading = $ionicLoading.show({
                //template: 'Guardando informa...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            var usuarioNuevo;


            usuarioNuevo = $scope.usuarioNuevo;
            usuarioNuevo.FAM_PER_JEFE = 0;
            $scope.error = "";


            PerfilService.agregarUsuario(usuarioNuevo, function(response) {

                if (response.success) {
                    $ionicLoading.hide();
                    AuthenticationService.Login($scope.usuarioNuevo.FAM_PER_DOCUMENTO, 'no-pass', function(response) {
                        $scope.loading = $ionicLoading.show({
                            //template: 'Guardando informa...',
                            animation: 'fade-in',
                            showBackdrop: true,
                            maxWidth: 40
                        });
                        if (response.success) {
                            AuthenticationService.SetCredentials($scope.usuarioNuevo.FAM_PER_DOCUMENTO, 'no-pass', response.message);
                            $scope.popUpAgregarFamiliar.close();
                            $ionicLoading.hide();
                            $location.path('/intro');
                        } else {
                            $scope.error = response.message;
                            $ionicLoading.hide();
                        }
                    });
                } else {
                    $scope.error = response.message;
                    $ionicLoading.hide();
                }
            });

        }

        $scope.playAudio = function(audio) {
            AudioService.play(audio, $scope.audios);
        };
    });
});
