
nutrifamiMobile.controller('AuthMigrationCtrl', function ($ionicPlatform, $scope, $rootScope, $ionicViewSwitcher, $location, $ionicLoading, $timeout, $cordovaInAppBrowser, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {
        $scope.formSignup = {};

        $scope.tempUser = JSON.parse(localStorage.getItem('tempUser'));
        
        $scope.signup = function () {

            if ($scope.formSignup.password === $scope.formSignup.password2) {
                $scope.loading = $ionicLoading.show({
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 40
                });

                var user = {
                    username: $scope.formSignup.username,
                    email: $scope.formSignup.email,
                    password: $scope.formSignup.password,
                    terminos: $scope.formSignup.terminos
                };
                
                UserService.signup(Object.assign(user, $scope.tempUser));

            } else {
                $scope.error = "Las contraseñas deben ser iguales";
                $timeout(function () {
                    $scope.error = "";
                }, 5000);
            }
        };
        
        $scope.verTerminos = function() {

            var options = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'yes'
            };

            $cordovaInAppBrowser.open('http://nutrifami.org/#/terminos-y-condiciones', '_blank', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                });
        };

        $scope.$on('userLoggedIn', function (event, data) {
            console.log("userLoggedIn Migration");
            
            UserService.migrarAvance().then(function() {
                $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
                $ionicLoading.hide();
                $location.path('/intro');
            });


        });

        // will fire in case authentication failed
        $scope.$on('userFailedLogin', function (event, response) {
            $ionicLoading.hide();
            console.log(response);
            $scope.error = response.message;
            $timeout(function () {
                $scope.error = "";
            }, 10000);

        });




    });
});