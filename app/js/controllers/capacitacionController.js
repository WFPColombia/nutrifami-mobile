/*global angular*/
nutrifamiMobile.controller('CapacitacionController', ['$scope', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', function ($scope, $anchorScroll, bsLoadingOverlayService, $timeout) {
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
        $scope.modulos = [];
        /* Obtenemos los ids de los modulos de la capacitación 3 */
        $scope.mids = nutrifami.training.getModulosId(3);
        /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
        for (var mid in $scope.mids) {
            var tempModulo = nutrifami.training.getModulo($scope.mids[mid]);
            tempModulo.avance = {};
            if (tempModulo.activo == '1') {
                tempModulo.activo = true;
            } else {
                tempModulo.activo = false;
            }

            if (typeof $scope.avanceUsuario['3'] !== 'undefined' && typeof $scope.avanceUsuario['3'][$scope.mids[mid]] !== 'undefined') {
                tempModulo.avance.leccionesFinalizadas = Object.keys($scope.avanceUsuario['3'][$scope.mids[mid]]).length;
            } else {
                tempModulo.avance.leccionesFinalizadas = 0;
            }
            $scope.modulos.push(tempModulo);
        }

        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */

    }]);