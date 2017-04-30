nutrifamiMobile.controller('misComprasIntroController', function($ionicLoading, $ionicPlatform, $ionicViewSwitcher, $location, $scope, $state, ComprasService, UsuarioService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo()

        $scope.preloadAudios = {};

        $scope.goTo = function() {
            MediaService.unload($scope.preloadAudios, function() {
                $scope.preloadAudios = {};
                $location.path('/app/mis-compras');
            });

        }

        $scope.playAudio = function(audio) {
            $scope.audios = {
                'audio1': MediaService.getMediaURL('audios/compras-intro-1.wav'),
                'audio2': MediaService.getMediaURL('audios/compras-intro-2.wav'),
            };

            if (typeof $scope.preloadAudios[audio] == 'undefined') {
                MediaService.preloadSimple($scope.audios, function(response) {
                    $scope.preloadAudios = response;
                    MediaService.play(audio, $scope.preloadAudios);
                });
            } else {
                MediaService.play(audio, $scope.preloadAudios);

            }
        };
    });
});
