nf2.controller('CapModuleCtrl', function ($ionicPlatform, $scope, $rootScope, $location, $stateParams, $ionicViewSwitcher, MediaService, UserService, CapacitationService, DownloadService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.modulo = CapacitationService.getModule($stateParams.module);
        $scope.usuarioActivo = UserService.getUser();
        $scope.lecciones = [];

        
        $scope.assetpath_audio = $rootScope.TARGETPATH_AUDIO + $stateParams.capacitation + "/" + $stateParams.module + "/";
        
        $scope.audios = {
            audioTitulo: $scope.assetpath_audio + $scope.modulo.titulo.audio.nombre,
            audioDescripcion: $scope.assetpath_audio + $scope.modulo.descripcion.audio.nombre
        };

        $scope.modulo.totalLecciones = 0;

        if ($rootScope.isMobile) {
            $scope.assetpath = $rootScope.TARGETPATH_IMAGES + $stateParams.capacitation + "/" + $stateParams.module + "/";
        } else {
            $scope.assetpath = $rootScope.TARGETPATH_IMAGES;
        }

        $scope.lids = CapacitationService.getLessonsIds($stateParams.module);
        $scope.audiosDescargados = DownloadService.paqueteDescargado('modulos', $stateParams.module, 'audios');

        function cargarCapacitacion() {
            for (var lid in $scope.lids) {
                var tempLeccion = CapacitationService.getLesson($scope.lids[lid]);
                if (tempLeccion.activo === "1") {
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
