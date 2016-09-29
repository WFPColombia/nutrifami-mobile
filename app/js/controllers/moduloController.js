nutrifamiMobile.controller('ModuloController', function($ionicPlatform, $scope, $location, $stateParams, $ionicViewSwitcher, AudioService, UsuarioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.usuarioAvance = UsuarioService.getUsuarioAvance();
        $scope.lecciones = [];

        $scope.modulo = nutrifami.training.getModulo($stateParams.modulo);

        $scope.audios = {
            'audioTitulo': "assets/" + $scope.modulo.titulo.audio.nombre,
            'audioDescripcion': "assets/" + $scope.modulo.titulo.audio.nombre
        };

        $scope.modulo.totalLecciones = Object.keys($scope.modulo.lecciones).length;
        $scope.lids = nutrifami.training.getLeccionesId($stateParams.modulo);
        console.log($scope.lids);

        for (var lid in $scope.lids) {
            var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);

            tempLeccion.avance = {};
            if (tempLeccion.titulo.audio.nombre !== null) {
                var id = parseInt(lid) + 1;
                tempLeccion.titulo.audio.id = "paso" + id;
                $scope.audios[tempLeccion.titulo.audio.id] = "assets/" + tempLeccion.titulo.audio.nombre;
            }
            if (typeof $scope.usuarioAvance['3'] !== 'undefined' && typeof $scope.usuarioAvance['3'][$stateParams.modulo] !== 'undefined' && typeof $scope.usuarioAvance['3'][$stateParams.modulo][$scope.lids[lid]] !== 'undefined') {
                tempLeccion.avance.terminada = true;
            } else {
                tempLeccion.avance.terminada = false;
            }
            $scope.lecciones.push(tempLeccion);
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
