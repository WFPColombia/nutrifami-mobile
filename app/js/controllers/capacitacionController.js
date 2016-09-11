/*global angular*/
nutrifamiMobile.controller('CapacitacionController', function ($ionicPlatform, $scope, $cordovaNativeAudio) {
    'use strict';

    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     AndroidFullScreen.immersiveMode();
     END CORDOVA FILES */
    $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    $scope.usuarioAvance = JSON.parse(localStorage.getItem('usuarioAvance'));
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

        if (typeof $scope.usuarioAvance['3'] !== 'undefined' && typeof $scope.usuarioAvance['3'][$scope.mids[mid]] !== 'undefined') {
            tempModulo.avance.leccionesFinalizadas = Object.keys($scope.usuarioAvance['3'][$scope.mids[mid]]).length;
        } else {
            tempModulo.avance.leccionesFinalizadas = 0;
        }
        $scope.modulos.push(tempModulo);
    }
    
    $scope.playAudio = function (audio) {
        $cordovaNativeAudio.play(audio);
    };

    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */

});