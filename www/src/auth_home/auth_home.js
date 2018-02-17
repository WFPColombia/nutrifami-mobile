nf2.controller('AuthHomeCtrl', function($ionicPlatform, $scope, $ionicViewSwitcher, $ionicLoading, $state, UserService) {
    'use strict';

    $ionicPlatform.ready(function() {
        
        $scope.usuarioNuevo = {};
             
        UserService.logOut();
        
        $scope.options = {
            loop: false,
            speed: 500
        };

        $scope.formLogin = {};
        $scope.formLoginCedula = {};

        $scope.login = function() {
            $scope.error = '';
            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });
            UserService.checkUser($scope.formLogin.username);
        };
        
        $scope.$on('userFailedLogin', function(event, response) {
            $ionicLoading.hide();
            $scope.error = response.message;
        });
        
        $scope.$on('userChecked', function (event, data) {
            console.log('userChecked');
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $ionicLoading.hide();
            $state.go('password');
        });

    });
});