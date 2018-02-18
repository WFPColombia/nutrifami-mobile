nf2.controller('AuthHomeCtrl', function($ionicPlatform, $scope, $ionicViewSwitcher, $ionicLoading, $state, $cordovaInAppBrowser,  UserService) {
    'use strict';

    $ionicPlatform.ready(function() {
        
        UserService.logOut();
        
        $scope.options = {
            loop: false,
            speed: 500
        };

        $scope.formLogin = {};

        $scope.login = function() {
            $scope.error = '';
            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });
            UserService.login($scope.formLogin.username, $scope.formLogin.password);
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
        
        $scope.$on('userFailedLogin', function(event, response) {
            $ionicLoading.hide();
            $scope.error = response.message;
        });
        
        $scope.$on('userLoggedIn', function (event, data) {
            console.log('userLoggedIn');
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $ionicLoading.hide();
            $state.go('nf.cap_home');
        });

    });
});