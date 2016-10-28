/*global angular*/
nutrifamiMobile.controller('IntroController', function($ionicPlatform, $scope, $location, AudioService, UsuarioService) {
    'use strict';

    $ionicPlatform.ready(function() {

        $scope.audios = {
            'audio1': 'www/audios/intro-1.mp3',
            'audio2': 'www/audios/intro-2.mp3',
            'audio3': 'www/audios/intro-3.mp3',
            'audio4': 'www/audios/intro-4.mp3'
        };
        AudioService.preloadSimple($scope.audios);

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

        $scope.playAudio = function(audio) {
            AudioService.play(audio);
        };

        $scope.comenzar = function() {
            AudioService.unload($scope.audios);
            $location.path('/');
        };

    });
});
