nutrifamiMobile.controller('ModuloController', ['$rootScope', '$scope', '$location', '$routeParams', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', 'ngAudio', function ($rootScope, $scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, $timeout, ngAudio) {
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
            bsLoadingOverlayService.stop();
        });

        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
        $scope.lecciones = [];

        /* Se hace un try por si el usuario intenta ingresar a la URL a otro modulo que lo lleve al home */
        try {
            $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
            console.log($scope.modulo);
            $scope.modulo.titulo.audio.audio = ngAudio.load("assets/" + $scope.modulo.titulo.audio.nombre);
            $scope.modulo.descripcion.audio.audio = ngAudio.load("assets/" + $scope.modulo.descripcion.audio.nombre);
            $scope.modulo.totalLecciones = Object.keys($scope.modulo.lecciones).length;
            $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
            console.log($scope.lids);
            for (var lid in $scope.lids) {
                var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);
                tempLeccion.avance = {};
                if (tempLeccion.titulo.audio.nombre !== null) {
                    tempLeccion.titulo.audio.audio = ngAudio.load("assets/" + tempLeccion.titulo.audio.nombre);
                }
                if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo] !== 'undefined' && typeof $scope.avanceUsuario['3'][$routeParams.modulo][$scope.lids[lid]] !== 'undefined') {
                    tempLeccion.avance.terminada = true;
                }
                else {
                    tempLeccion.avance.terminada = false;
                }
                $scope.lecciones.push(tempLeccion);
            }
        } catch (err) {
            $location.path('/');
        }

        $scope.porcentajeAvance = function () {
            return(100 / $scope.modulo.totalLecciones * $scope.avanceUsuario.leccionesTerminadas);
        };
        $scope.irALeccion = function (index) {
            $location.path('/m/' + $routeParams.modulo + "/" + $scope.lids[index] + "/1");
        };
        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */
    }]);