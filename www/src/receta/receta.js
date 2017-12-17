nutrifamiMobile.controller('RecetaCtrl', function($ionicPlatform, $scope, $ionicLoading, $location, $stateParams, $ionicViewSwitcher, $ionicHistory, UserService, RecetasService) {
    'use strict';


    $ionicPlatform.ready(function() {


        var receta_id = $stateParams.receta_id;
        $scope.usuarioActivo = UserService.getUser();

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


        $scope.compartirReceta = function(rec) {


            RecetasService.compartirReceta(rec, $scope.usuarioActivo.id);
            $scope.receta.compartidos++;

        };


        $scope.meGusta = function(receta_id) {
            if ($scope.receta.me_gusta) {
                $scope.receta.me_gustas--;
                $scope.receta.me_gusta = false;
                RecetasService.restarMeGusta(receta_id, $scope.usuarioActivo.id);
            } else {
                $scope.receta.me_gustas++;
                $scope.receta.me_gusta = true;
                RecetasService.sumarMeGusta(receta_id, $scope.usuarioActivo.id);
            }

        }

        $scope.myGoBack = function() {
            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
            $ionicHistory.goBack()
        };

        function init() {

            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            RecetasService.verReceta(receta_id, function(response) {
                $scope.receta = response;
                console.log($scope.receta);
                $ionicLoading.hide();
            });

        }

        init();



    });
});