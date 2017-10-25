nutrifamiMobile.controller('AuthLoginCtrl', function($ionicPlatform, $scope, $rootScope, $ionicViewSwitcher, $location, $ionicSlideBoxDelegate, UserService) {
    'use strict';

    $ionicPlatform.ready(function() {


        /*console.log("Login!!");

        console.log(UserService.isAuthenticated());

        if (UserService.isAuthenticated()) {
            $location.path('/app/search');
        }

        $scope.options = {
            loop: false,
            effect: 'fade',
            speed: 500,
        }


        $scope.authenticate = function(provider) {
            UserService.authenticate(provider);
        };

        $rootScope.$on('userLoggedIn', function(data) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/search');

        });

        // will fire in case authentication failed
        $rootScope.$on('userFailedLogin', function() {
            console.log("Error al iniciar sesión");

        });

        $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
            // data.slider is the instance of Swiper
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
            console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
            // note: the indexes are 0-based
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });


        $scope.irAPestana = function(id) {


            $scope.slider.slideTo(id);


            //$ionicSlideBoxDelegate.slide(id);

        }*/


    });
});