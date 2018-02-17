nf2.controller('ModuloCtrl', function ($ionicPlatform, $scope, $rootScope, $location, $stateParams, $ionicViewSwitcher, MediaService, UserService, CapacitacionService, DescargaService) {
    'use strict';
    $ionicPlatform.ready(function () {

        CapacitacionService.initClient();
        $scope.modulo = CapacitacionService.getModulo($stateParams.modulo);
        $scope.usuarioActivo = UserService.getUser();
        $scope.lecciones = [];

        $scope.assetpath = $rootScope.TARGETPATH + $stateParams.capacitacion + "/" + $stateParams.modulo + "/";
        $scope.assetpath_audio = $rootScope.TARGETPATH_AUDIO + $stateParams.capacitacion + "/" + $stateParams.modulo + "/";

        $scope.audios = {
            audioTitulo: $scope.assetpath_audio + $scope.modulo.titulo.audio.nombre,
            audioDescripcion: $scope.assetpath_audio + $scope.modulo.descripcion.audio.nombre
        };

        $scope.modulo.totalLecciones = 0;

        $scope.lids = nutrifami.training.getLeccionesId($stateParams.modulo);
        $scope.audiosDescargados = DescargaService.paqueteDescargado('modulos', $stateParams.modulo, 'audios');

        function cargarCapacitacion() {
            for (var lid in $scope.lids) {
                var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);
                if (tempLeccion.activo == 1) {
                    if (tempLeccion.titulo.audio.nombre !== null) {
                        var id = parseInt(lid) + 1;
                        tempLeccion.titulo.audio.id = "paso" + id;
                        $scope.audios[tempLeccion.titulo.audio.id] = $scope.assetpath_audio + $scope.lids[lid] + "/" + tempLeccion.titulo.audio.nombre;
                    }
                    $scope.modulo.totalLecciones++;
                    $scope.lecciones.push(tempLeccion);
                }
            }
            
        }

        $scope.playAudio = function (audio) {
            MediaService.play(audio);
        };

        $scope.porcentajeAvance = function () {
            return (100 / $scope.modulo.totalLecciones * $scope.usuarioAvance.leccionesTerminadas);
        };
        $scope.irALeccion = function (index) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/' + $stateParams.capacitacion + '/' + $stateParams.modulo + "/" + $scope.lids[index] + "/1");
        };

        cargarCapacitacion();

        $scope.$on('$ionicView.enter', function () {
            console.log('$ionicView.enter');
            if ($scope.audiosDescargados) {
                MediaService.preloadSimple($scope.audios);
            }
        });

        $scope.$on('$ionicView.beforeLeave', function () {
            console.log('$ionicView.beforeLeave');
            MediaService.unload();
        });
        
    });

});
