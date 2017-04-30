/*global angular*/
nutrifamiMobile.controller('IntroController', function($ionicPlatform, $scope, $location, MediaService, UsuarioService) {
    'use strict';

    $ionicPlatform.ready(function() {

        $scope.audios = {
            'audio1': MediaService.getMediaURL('audios/intro-1.wav'),
            'audio2': MediaService.getMediaURL('audios/intro-2.wav'),
            'audio3': MediaService.getMediaURL('audios/intro-3.wav'),
            'audio4': MediaService.getMediaURL('audios/intro-4.wav'),
        };


        MediaService.preloadSimple($scope.audios, function(response) {
            $scope.audios = response;
        });

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

        $scope.playAudio = function(audio) {
            MediaService.play(audio, $scope.audios);
        };

        $scope.comenzar = function() {
            MediaService.unload($scope.audios);
            $location.path('/');
        };

    });
});
