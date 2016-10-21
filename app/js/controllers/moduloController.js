nutrifamiMobile.controller('ModuloController', function($ionicPlatform, $scope, $rootScope, $location, $stateParams, $ionicViewSwitcher, AudioService, UsuarioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.usuarioAvance = UsuarioService.getUsuarioAvance();
        $scope.lecciones = [];

        $scope.modulo = nutrifami.training.getModulo($stateParams.modulo);
        console.log($scope.modulo);
        $scope.modulo.totalLecciones = 0;

        $scope.audios = {
            'audioTitulo': $rootScope.TARGETPATH + $scope.modulo.titulo.audio.nombre,
            'audioDescripcion': $rootScope.TARGETPATH + $scope.modulo.titulo.audio.nombre
        };


        $scope.lids = nutrifami.training.getLeccionesId($stateParams.modulo);

        for (var lid in $scope.lids) {
            var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);

            if (tempLeccion.activo == 1) {
                tempLeccion.avance = {};

                if (tempLeccion.titulo.audio.nombre !== null) {
                    var id = parseInt(lid) + 1;
                    tempLeccion.titulo.audio.id = "paso" + id;
                    $scope.audios[tempLeccion.titulo.audio.id] = $rootScope.TARGETPATH + tempLeccion.titulo.audio.nombre;
                }
                if (typeof $scope.usuarioAvance['3'] !== 'undefined' && typeof $scope.usuarioAvance['3'][$stateParams.modulo] !== 'undefined' && typeof $scope.usuarioAvance['3'][$stateParams.modulo][$scope.lids[lid]] !== 'undefined') {
                    tempLeccion.avance.terminada = true;
                } else {
                    tempLeccion.avance.terminada = false;
                }
                $scope.modulo.totalLecciones++;
                $scope.lecciones.push(tempLeccion);
            }
        }

        AudioService.preloadSimple($scope.audios);

        $scope.playAudio = function(audio) {
            AudioService.play(audio, $scope.audios);
        };

        $scope.porcentajeAvance = function() {
            return (100 / $scope.modulo.totalLecciones * $scope.usuarioAvance.leccionesTerminadas);
        };
        $scope.irALeccion = function(index) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            AudioService.unload($scope.audios);
            $location.path('/capacitacion/' + $stateParams.modulo + "/" + $scope.lids[index] + "/1");
        };
    });
});
