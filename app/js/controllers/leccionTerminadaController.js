/*global angular*/
nutrifamiMobile.controller('LeccionTerminadaController', ['$scope', '$routeParams', '$anchorScroll', 'ngAudio', 'bsLoadingOverlayService', '$timeout', function ($scope, $routeParams, $anchorScroll, ngAudio, bsLoadingOverlayService, $timeout) {
        'use strict';
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
            /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
             * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
            $timeout(function () {
                bsLoadingOverlayService.stop();
            }, 300);
        });
        
        $scope.progressbar = 0;

        $timeout(function () {
            ngAudio.play("audios/muy-bien-leccion-completada.mp3");
            $scope.progressbar = 100;
        }, 1000);

        $scope.leccionCompletada = {};
        $scope.leccionCompletada.audio = ngAudio.load("audios/muy-bien-leccion-completada.mp3");

        $scope.leccion = nutrifami.training.getLeccion($routeParams.leccion);
        $scope.leccion.finalizado.audio.audio = ngAudio.load("assets/"+$scope.leccion.finalizado.audio.nombre);
        $scope.leccion.finalizado.audio.audioPuntos = ngAudio.load("audios/"+$scope.leccion.finalizado.puntos+"-puntos-ganados.mp3");
        console.log($scope.leccion);





        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */
    }]);