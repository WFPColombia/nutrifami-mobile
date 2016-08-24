nutrifamiMobile.controller('ModuloController', ['$rootScope', '$scope', '$location', '$routeParams', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', 'ngAudio', function ($rootScope, $scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, $timeout, ngAudio) {
        'use strict';

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
        $scope.avanceUsuario = JSON.parse(localStorage.getItem('avanceUsuario'));
        $scope.lecciones = [];

        /* Se hace un try por si el usuario intenta ingresar a la URL a otro modulo que lo lleve al home */
        try {
            $scope.modulo = nutrifami.training.getModulo($routeParams.modulo);
            $scope.modulo.titulo.audio.audio = ngAudio.load("assets/" + $scope.modulo.titulo.audio.nombre);
            $scope.modulo.descripcion.audio.audio = ngAudio.load("assets/" + $scope.modulo.descripcion.audio.nombre);
            $scope.modulo.totalLecciones = Object.keys($scope.modulo.lecciones).length;
            $scope.lids = nutrifami.training.getLeccionesId($routeParams.modulo);
            console.log($scope.lids);
            for (var lid in $scope.lids) {
                var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);
                tempLeccion.titulo.audio.audio = ngAudio.load("assets/"+tempLeccion.titulo.audio.nombre); 
                $scope.lecciones.push(tempLeccion);
            }
        } catch (err) {
            $location.path('/');
        }
        
        console.log($scope.avanceUsuario);
        for (var i = 0; i < $scope.avanceUsuario.lecciones.length; i++) {
            console.log($scope.lecciones[i]);
            if ( typeof $scope.lecciones[i] !== 'undefined' ) {
                if ($scope.avanceUsuario.lecciones[i] == 1 ) {
                    $scope.lecciones[i].class = 'leccion-terminada';
                    $scope.lecciones[i].terminada = true;
                } else {
                    $scope.lecciones[i].terminada = false;
                }
            }
        }
        $scope.porcentajeAvance = function () {
            return(100 / $scope.modulo.totalLecciones * $scope.avanceUsuario.leccionesTerminadas);
        };
        $scope.irALeccion = function (index) {
            $location.path('/m/' + $routeParams.modulo + "/" + $scope.lids[index] + "/1");
        };
    }]);