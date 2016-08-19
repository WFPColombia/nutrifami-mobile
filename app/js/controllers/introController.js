/*global angular*/
nutrifamiMobile.controller('IntroController', ['$scope', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', '$location', 'ngAudio',
    function ($scope, $anchorScroll, bsLoadingOverlayService, $timeout, $location, ngAudio ) {
        'use strict';

        /*document.addEventListener('deviceready', function () {
         
         AndroidFullScreen.immersiveMode();*/

        $anchorScroll();

        /* Overloading*/
        bsLoadingOverlayService.start();
        /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
        $scope.$on('$viewContentLoaded', function () {
            /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
             * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
            $timeout(function () {
                bsLoadingOverlayService.stop();
            }, 300);
        });
        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        console.log($scope.usuarioActivo);
        
        $scope.audio1 = ngAudio.load("audios/intro-1.mp3");
        $scope.audio2 = ngAudio.load("audios/intro-2.mp3");
        $scope.audio3 = ngAudio.load("audios/intro-3.mp3");
        $scope.audio4 = ngAudio.load("audios/intro-4.mp3");

        $scope.comenzar = function () {
            $location.path('/');
        };


        /*}, false);*/

    }]);