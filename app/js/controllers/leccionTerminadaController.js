/*global angular*/
nutrifamiMobile.controller('LeccionTerminadaController', function ($ionicPlatform, $scope, $stateParams, $timeout, $location, AudioService) {
    'use strict';

    $ionicPlatform.ready(function () {
        
        $scope.leccion = nutrifami.training.getLeccion($stateParams.leccion);
        $scope.audios = {
            'leccionCompletada': 'audios/muy-bien-leccion-completada.mp3',
            'audioPuntos': 'audios/' + $scope.leccion.finalizado.puntos + '-puntos-ganados.mp3',
            'audioFinalizado': 'assets/' + $scope.leccion.finalizado.audio.nombre,
        };
        AudioService.preloadSimple($scope.audios);



        $timeout(function () {
            AudioService.play('leccionCompletada');
        }, 1000);

        $scope.leccionCompletada = {};
        //$scope.leccionCompletada.audio = ngAudio.load("audios/muy-bien-leccion-completada.mp3");

        

        console.log($scope.leccion);

        //$scope.leccion.finalizado.audio.audio = ngAudio.load("assets/" + $scope.leccion.finalizado.audio.nombre);
        //$scope.leccion.finalizado.audio.audioPuntos = ngAudio.load("audios/" + $scope.leccion.finalizado.puntos + "-puntos-ganados.mp3");

        $scope.playAudio = function (audio) {
            AudioService.play(audio);
        };

        $scope.continuar = function () {
            AudioService.unload($scope.audios);
            $location.path("/app/capacitacion/" + $stateParams.modulo);
        };
    });



});