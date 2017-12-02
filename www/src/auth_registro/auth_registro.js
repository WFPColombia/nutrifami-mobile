nutrifamiMobile.controller('AuthRegistroCtrl', function ($ionicPlatform, $scope, $rootScope, $ionicViewSwitcher, $location, $ionicLoading, $auth, $timeout, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {
        $scope.formSignup = {};

        $scope.signup = function () {

            console.log($scope.formSignup);

            if ($scope.formSignup.password === $scope.formSignup.password2) {
                $scope.loading = $ionicLoading.show({
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 40
                });
                UserService.signup($scope.formSignup.username, $scope.formSignup.email, $scope.formSignup.password);
                
            } else {
                $scope.error = "Las contraseñas deben ser iguales";
                $timeout(function () {
                    $scope.error = "";
                }, 5000);
            }
        };

        $rootScope.$on('userLoggedIn', function (event, data) {
            $ionicLoading.hide();
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/intro');

        });

        // will fire in case authentication failed
        $rootScope.$on('userFailedLogin', function (event, response) {
            $ionicLoading.hide();
            console.log(response);
            $scope.error = response.message;
            $timeout(function () {
                $scope.error = "";
            }, 10000);

        });




    });
});