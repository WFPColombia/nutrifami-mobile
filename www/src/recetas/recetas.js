nutrifamiMobile.controller('RecetasCtrl', function($ionicPlatform, $scope, $ionicLoading, $location, $ionicViewSwitcher, RecetasService) {
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


        RecetasService.actualizar(function(response) {
            console.log(response);
            $ionicLoading.hide();
        });

        $scope.abrirReceta = function(id) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/recetas/receta/' + id);
        }



    });
});