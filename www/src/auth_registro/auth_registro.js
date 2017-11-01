nutrifamiMobile.controller('AuthRegistroCtrl', function ($ionicPlatform, $scope, $rootScope, $ionicViewSwitcher, $location, $http, $auth) {
    'use strict';

    $ionicPlatform.ready(function () {


        console.log("Registro!!");



        $scope.signup = function () {


            /*$http({
                method: 'POST',
                url: 'http://localhost:8000/api-token-auth/',
                data: {username: 'fats2005', password: 'Bog1986ota'}
            }).then(function successCallback(response) {
                console.log(response);
                callback(response);
            }, function errorCallback(response) {
                console.log(response);
                callback(false);
            });*/

            var user = {
                username: 'fats2005',
                password: 'Bog1986ota'
            };

            $auth.login(user)
                    .then(function (response) {
                        // Redirect user here after a successful log in.
                        console.log(response);
                    })
                    .catch(function (response) {
                        // Handle errors here, such as displaying a notification
                        // for invalid email and/or password.
                        console.log(response);
                    });
        };

        $rootScope.$on('userLoggedIn', function (data) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/search');

        });

        // will fire in case authentication failed
        $rootScope.$on('userFailedLogin', function () {
            console.log("Error al iniciar sesión");

        });




    });
});