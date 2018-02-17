nf2.controller('AuthSignupCtrl', function ($ionicPlatform, $scope, $rootScope, $ionicViewSwitcher, $location, $ionicLoading, $auth, $timeout, $cordovaInAppBrowser, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {
        $scope.formSignup = {};

        $scope.signup = function () {

            if ($scope.formSignup.password === $scope.formSignup.password2) {
                $scope.loading = $ionicLoading.show({
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 40
                });

                var user = {
                    username: $scope.formSignup.username,
                    email: '',
                    password: $scope.formSignup.password,
                    first_name: '',
                    last_name: '',
                    id_antiguo: null,
                    terminos: $scope.formSignup.terminos,
                };
                UserService.signup(user);

            } else {
                $scope.error = "Las contraseñas deben ser iguales";
            }
        };
        
        $scope.verTerminos = function() {

            var options = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'yes'
            };

            $cordovaInAppBrowser.open('http://nutrifami.org/#!/terminos-y-condiciones', '_blank', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                });
        };

        $scope.$on('userLoggedIn', function (event, data) {
            console.log("userLoggedIn Registro");
            $ionicLoading.hide();
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/intro');

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