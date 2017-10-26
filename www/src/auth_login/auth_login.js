nutrifamiMobile.controller('AuthLoginCtrl', function($ionicPlatform, $scope, $rootScope, $ionicViewSwitcher, $location, $ionicSlideBoxDelegate, $ionicLoading, UserService, AuthenticationService, $timeout) {
    'use strict';

    $ionicPlatform.ready(function() {


        console.log("Login!!");
        $scope.activeIndex = 0;

        console.log(UserService.isAuthenticated());

        /*if (UserService.isAuthenticated()) {
            $location.path('/app/search');
        }*/

        $scope.options = {
            loop: false,
            /*effect: 'fade',*/
            speed: 500,
        }

        $scope.formDoc = {};

        $scope.login = function() {

            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            $scope.dataLoading = true;
            AuthenticationService.Login($scope.formDoc.username, 'no-pass', function(response) {

                if (response.success) {
                    AuthenticationService.SetCredentials($scope.formDoc.username, $scope.formDoc.password, response.message);

                    //AudioService.unload($scope.audios);
                    $ionicLoading.hide();
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


        $scope.authenticate = function(provider) {
            UserService.authenticate(provider);
        };

        $scope.$on('$viewContentLoaded', function() {
            console.log("probando");
        });

        $rootScope.$on('userLoggedIn', function(data) {
            $scope.user = UserService.getUser();
            AuthenticationService.SetCredentials($scope.user.username, 'no-pass', $scope.user.token);
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/');

        });

        // will fire in case authentication failed
        $rootScope.$on('userFailedLogin', function() {
            console.log("Error al iniciar sesión");

        });



        $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
            // data.slider is the instance of Swiper
            console.log("$ionicSlides.sliderInitialized");
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
            console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
            // note: the indexes are 0-based
            console.log('Slide change is Ended');
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });


        $scope.irAPestana = function(id) {
            $scope.slider.slideTo(id);
            $ionicSlideBoxDelegate.slide(id);

        }


    });
});