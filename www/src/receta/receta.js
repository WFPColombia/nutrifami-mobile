nutrifamiMobile.controller('RecetaCtrl', function($ionicPlatform, $scope, $ionicLoading, $location, $stateParams, $ionicViewSwitcher, $ionicHistory, UsuarioService, RecetasService) {
    'use strict';


    $ionicPlatform.ready(function() {


        var receta_id = $stateParams.receta_id;
        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

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


        $scope.compartirReceta = function(receta_id, receta_nombre) {
            var options = {
                message: receta_nombre, // not supported on some apps (Facebook, Instagram)
                subject: 'Mira esta receta saludable de Nutrifami', // fi. for email
                files: ['', ''], // an array of filenames either locally or remotely
                url: 'https://www.nutrifami.org/',
                chooserTitle: 'Eliga una aplicación para compartir' // Android only, you can override the default share sheet title
            }
            window.plugins.socialsharing.shareWithOptions(options, function(result) {
                RecetasService.sumarCompartir(receta_id, $scope.usuarioActivo.id);

                $scope.receta.compartidos++;

                console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)

            }, function(msg) {
                console.log("Sharing failed with message: " + msg);
            });

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