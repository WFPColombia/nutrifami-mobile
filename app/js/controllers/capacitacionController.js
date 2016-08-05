/*global angular*/
nutrifamiMobile.controller('CapacitacionController',['$scope', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', function ($scope, $anchorScroll, bsLoadingOverlayService, $timeout) {
    'use strict';
    /*document.addEventListener("deviceready", function () {*/

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
    $scope.modulos = [];
    /* Obtenemos los ids de los modulos de la capacitación 3 */
    $scope.mids = nutrifami.training.getModulosId(3);
    /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
    for (var mid in $scope.mids) {
        $scope.modulos.push(nutrifami.training.getModulo($scope.mids[mid]));

    }
            console.log($scope.modulos);

    /*}, true);*/

}]);