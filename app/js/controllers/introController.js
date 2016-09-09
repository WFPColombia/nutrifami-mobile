/*global angular*/
nutrifamiMobile.controller('IntroController', function ($ionicPlatform, $scope, $cordovaNativeAudio, $location) {
    'use strict';

    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     AndroidFullScreen.immersiveMode();
     $cordovaNativeAudio.preloadSimple('audio1', 'audios/intro-1.mp3');
     $cordovaNativeAudio.preloadSimple('audio2', 'audios/intro-2.mp3');
     $cordovaNativeAudio.preloadSimple('audio3', 'audios/intro-3.mp3');
     $cordovaNativeAudio.preloadSimple('audio4', 'audios/intro-4.mp3');
     END CORDOVA FILES */

    $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    console.log($scope.usuarioActivo);

    $scope.playAudio = function (audio) {
        $cordovaNativeAudio.play(audio);
    };


    $scope.comenzar = function () {
        $location.path('/');
    };
    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});