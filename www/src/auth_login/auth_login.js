nutrifamiMobile.controller('AuthLoginCtrl', function($ionicPlatform, $scope, $rootScope, $location,  $ionicViewSwitcher, $ionicSlideBoxDelegate, $ionicLoading, UserService, $timeout, $cordovaInAppBrowser, CapacitacionService) {
    'use strict';

    $ionicPlatform.ready(function() {
                
        CapacitacionService.initClient();       
        $scope.activeIndex = 0;

        /*if (UserService.isAuthenticated()) {
            $location.path('/app/search');
        }*/

        $scope.options = {
            loop: false,
            /*effect: 'fade',*/
            speed: 500
        };

        $scope.formLogin = {};
        $scope.formLoginCedula = {};



        $scope.login = function() {
            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });
            UserService.login($scope.formLogin.username, $scope.formLogin.password);
        };

        $scope.loginCedula = function() {

            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            UserService.loginCedula($scope.formLoginCedula.username, 'no-pass');
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

            $cordovaInAppBrowser.open('http://usuarios.nutrifami.org/admin/password_reset/', '_blank', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                });
        };

        $scope.$on('userLoggedIn', function(event, data) {
            console.log("userLoggedIn Login");
            $ionicLoading.hide();
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/intro');

        });

        // will fire in case authentication failed
        $scope.$on('userFailedLogin', function(event, response) {
            $ionicLoading.hide();
            console.log(response);
            $scope.error = response.message;
            $timeout(function() {
                $scope.error = "";
            }, 3000);
        });
        
        $scope.$on('userLoggedInwithDocument', function(event, data) {
            $ionicLoading.hide();
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/auth/migration');

        });

        $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
            // data.slider is the instance of Swiper
            console.log("$ionicSlides.sliderInitialized");
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {});

        $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });

        $scope.irAPestana = function(id) {
            $scope.slider.slideTo(id);
            $ionicSlideBoxDelegate.slide(id);

        };


    });
});