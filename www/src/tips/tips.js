nf2.controller('TipsCtrl', function ($ionicPlatform, $stateParams, $scope, $rootScope, $location, MediaService, UserService, CapacitationService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.usuarioActivo = UserService.getUser();
        $scope.assetpath = $rootScope.TARGETPATH_IMAGES + "3/";

        CapacitationService.initClient();

        $scope.audios = {};
        $scope.modulos = [];
        // Obtenemos los ids de los modulos de la capacitación 3

        $scope.mids = CapacitationService.getModulesIds(3);
        /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
        for (var mid in $scope.mids) {
            var tempModulo = CapacitationService.getModule($scope.mids[mid]);
            $scope.audios["modulo" + tempModulo.id] = $rootScope.TARGETPATH_AUDIO + '3/' + tempModulo.id + '/' + tempModulo.titulo.audio.nombre;
            $scope.modulos.push(tempModulo);
        }

        $scope.playAudio = function (audio) {
            MediaService.play(audio);
        };

        $scope.ir = function (id) {
            MediaService.unload();
            $location.path('/tips/' + id);
        };
        $scope.$on('$ionicView.enter', function () {
            console.log('$ionicView.enter');
            MediaService.preloadSimple($scope.audios);
        });

        $scope.$on('$ionicView.beforeLeave', function () {
            console.log('$ionicView.beforeLeave');
            MediaService.unload();
        });

    });
});
