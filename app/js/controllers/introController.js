/*global angular*/
nutrifamiMobile.controller('IntroController', ['$scope', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', '$location', 'ngAudio',
    function ($scope, $anchorScroll, bsLoadingOverlayService, $timeout, $location, ngAudio) {
        'use strict';

        /* BEGIN CORDOVA FILES
         document.addEventListener('deviceready', function () {
         AndroidFullScreen.immersiveMode();
         END CORDOVA FILES */
        $anchorScroll();

        /* Overloading*/
        bsLoadingOverlayService.start();
        /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
        $scope.$on('$viewContentLoaded', function () {
            bsLoadingOverlayService.stop();
        });
        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.audio1 = ngAudio.load("audios/intro-1.mp3");
        $scope.audio2 = ngAudio.load("audios/intro-2.mp3");
        $scope.audio3 = ngAudio.load("audios/intro-3.mp3");
        $scope.audio4 = ngAudio.load("audios/intro-4.mp3");

        $scope.comenzar = function () {
            $location.path('/');
        };
        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */
    }]);