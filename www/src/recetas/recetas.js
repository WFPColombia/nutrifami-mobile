nutrifamiMobile.controller('RecetasCtrl', function($ionicPlatform, $scope, $ionicLoading, RecetasService) {
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



    });
});