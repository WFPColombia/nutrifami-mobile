nutrifamiMobile.controller('RecetaCtrl', function($ionicPlatform, $scope, $ionicLoading, $location, $ionicViewSwitcher, RecetasService) {
    'use strict';


    $ionicPlatform.ready(function() {

        $scope.loading = $ionicLoading.show({
            // The text to display in the loading indicator
            //template: 'Cargando...',
            // The animation to use
            animation: 'fade-in',
            // Will a dark overlay or backdrop cover the entire view
            showBackdrop: true,
            // The maximum width of the loading indicator
            // Text will be wrapped if longer than maxWidth
            maxWidth: 40
        });

        //$ionicLoading.hide();

        $scope.options = {
            loop: false,
            effect: 'fade',
            speed: 500,
        }

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





        RecetasService.actualizar(function(response) {
            console.log(response);
            $ionicLoading.hide();
        });

        $scope.myGoBack = function() {
            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
            $location.path('/app/recetas');
        };



    });
});