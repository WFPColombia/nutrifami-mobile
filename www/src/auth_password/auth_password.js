nf2.controller('AuthPasswordCtrl', function($ionicPlatform, $scope, $state, $ionicLoading, UserService, $cordovaInAppBrowser, CapacitacionService) {
    'use strict';

    $ionicPlatform.ready(function() {
                
        CapacitacionService.initClient();       
        $scope.activeIndex = 0;

        $scope.options = {
            loop: false,
            /*effect: 'fade',*/
            speed: 500
        };

        $scope.formLogin = {};

        $scope.login = function() {
            $scope.error = "";
            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });
            UserService.login($scope.formLogin.password);
        };

        $scope.authenticate = function(provider) {
            console.log("Click " + provider);
            UserService.authenticate(provider);
        };
        
        $scope.olvidoContrasena = function() {
            var options = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'yes'
            };
            $cordovaInAppBrowser.open('http://usuarios.nutrifami.org/admin/password_reset/', '_blank', options);
        };

        $scope.$on('userLoggedIn', function(event, data) {
            console.log("userLoggedIn Login");
            $ionicLoading.hide();
            //$ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $state.go('nf.cap_home');

        });

        // will fire in case authentication failed
        $scope.$on('userFailedLogin', function(event, response) {
            $ionicLoading.hide();
            console.log(response);
            $scope.error = response.message;
        });
        
    });
});