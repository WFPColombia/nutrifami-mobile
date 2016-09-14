/*global angular*/
nutrifamiMobile.controller('IntroController', function ($ionicPlatform, $scope, $location, AudioService, UsuarioService) {
    'use strict';

    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     END CORDOVA FILES */

    $scope.audios = {
        'audio1': 'audios/intro-1.mp3',
        'audio2': 'audios/intro-2.mp3',
        'audio3': 'audios/intro-3.mp3',
        'audio4': 'audios/intro-4.mp3'
    };
    AudioService.preloadSimple($scope.audios);

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

    $scope.playAudio = function (audio) {
        AudioService.stopAll($scope.audios);
        AudioService.play(audio);
    };

    $scope.comenzar = function () {
        AudioService.stopAll($scope.audios);
        $location.path('/');
    };
    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});