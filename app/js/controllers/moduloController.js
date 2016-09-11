nutrifamiMobile.controller('ModuloController', function ($ionicPlatform, $scope, $location, $stateParams, $cordovaNativeAudio) {
    'use strict';
    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     AndroidFullScreen.immersiveMode();
     END CORDOVA FILES */

    $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    $scope.usuarioAvance = JSON.parse(localStorage.getItem('usuarioAvance'));
    $scope.lecciones = [];

    /* Se hace un try por si el usuario intenta ingresar a la URL a otro modulo que lo lleve al home */
    //try {
    $scope.modulo = nutrifami.training.getModulo($stateParams.modulo);
    /* BEGIN CORDOVA FILES
     $cordovaNativeAudio.preloadSimple('audioTitulo', "assets/" + $scope.modulo.titulo.audio.nombre);
     $cordovaNativeAudio.preloadSimple('audioDescripcion', "assets/" + $scope.modulo.titulo.audio.nombre);
     END CORDOVA FILES */

    $scope.modulo.totalLecciones = Object.keys($scope.modulo.lecciones).length;
    $scope.lids = nutrifami.training.getLeccionesId($stateParams.modulo);
    console.log($scope.lids);
    for (var lid in $scope.lids) {
        var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);
        tempLeccion.avance = {};
        if (tempLeccion.titulo.audio.nombre !== null) {
            console.log(tempLeccion.titulo.audio.nombre);
            /* BEGIN CORDOVA FILES
             $cordovaNativeAudio.preloadSimple(tempLeccion.titulo.audio.nombre, "assets/" + tempLeccion.titulo.audio.nombre);
             END CORDOVA FILES */
        }
        if (typeof $scope.usuarioAvance['3'] !== 'undefined' && typeof $scope.usuarioAvance['3'][$stateParams.modulo] !== 'undefined' && typeof $scope.usuarioAvance['3'][$stateParams.modulo][$scope.lids[lid]] !== 'undefined') {
            tempLeccion.avance.terminada = true;
        }
        else {
            tempLeccion.avance.terminada = false;
        }
        $scope.lecciones.push(tempLeccion);
    }
    /*} catch (err) {
     $location.path('/');
     }*/

    $scope.playAudio = function (audio) {
        console.log(audio);
        $cordovaNativeAudio.play(audio);
    };

    $scope.porcentajeAvance = function () {
        return(100 / $scope.modulo.totalLecciones * $scope.usuarioAvance.leccionesTerminadas);
    };
    $scope.irALeccion = function (index) {
        $location.path('/m/' + $stateParams.modulo + "/" + $scope.lids[index] + "/1");
    };
    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});