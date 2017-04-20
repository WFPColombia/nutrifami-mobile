nutrifamiMobile.controller('misComprasIntroController', function($ionicLoading, $ionicPlatform, $ionicViewSwitcher, $location, $scope, $state, ComprasService, UsuarioService, AudioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo()

        $scope.audios = {
            'audio1': 'audios/compras-intro.mp3'
        };
        AudioService.preloadSimple($scope.audios);

        $scope.goTo = function() {
            AudioService.unload($scope.audios);
            $location.path('/app/mis-compras');
        }

        $scope.playAudio = function(audio) {
            AudioService.play(audio, $scope.audios);
        };



    });
});
