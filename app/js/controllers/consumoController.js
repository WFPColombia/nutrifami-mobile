nutrifamiMobile.controller('ConsumoController', ['$rootScope', '$scope', '$location', '$routeParams', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', 'ngAudio', 'ConsumoService', function ($rootScope, $scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, $timeout, ngAudio, ConsumoService) {
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

        $scope.audio = ngAudio.load("audios/compras-intro.mp3");

        var usuario = {};
        usuario.did = 66976632;

        ConsumoService.getConsolidadoCompras(usuario, function (response) {

            if (response.success) {
                $scope.consumo = response.data.redencion;
                console.log($scope.consumo);
            } else {
                console.log(response.message);
            }
        });

        $scope.consumoUltimoMes = getLast(getLast($scope.consumo));
        console.log($scope.consumoUltimoMes);

        function getLast(myObj) {
            var keys = [];
            for (var k in myObj) {
                if (myObj.hasOwnProperty(k)) {
                    keys.push(myObj[k]);
                }
            }
            keys.sort(); /*Organiza el arreglo*/
            keys.reverse(); /*Lo invierte para obtener el ultimo*/
            return keys[0];
        };

        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */
    }]);