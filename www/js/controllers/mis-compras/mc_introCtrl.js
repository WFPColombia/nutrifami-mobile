nutrifamiMobile.controller('mc_introCtrl', function($ionicLoading, $ionicPlatform, $ionicViewSwitcher, $location, $scope, $state, ComprasService, UsuarioService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.audios = {};
        $scope.usuarioActivo = UsuarioService.getUsuarioActivo()

        $scope.goTo = function() {
            $location.path('/app/mis-compras');
        }

        $scope.playAudio = function(audio) {
            MediaService.play(audio, $scope.audios);
        };

        $scope.$on("$ionicView.enter", function(event, data) {
            $scope.audios = {
                'audio1': MediaService.getMediaURL('audios/compras-intro-1.wav'),
                'audio2': MediaService.getMediaURL('audios/compras-intro-2.wav'),
            };
            MediaService.preloadSimple($scope.audios);
        });


        $scope.$on("$ionicView.beforeLeave", function(event, data) {
            MediaService.unload($scope.audios);
        });

        $scope.$on("$ionicView.unloaded", function(event, data) {
            console.log("Unload State Params: ", data);
        });

    });
});
