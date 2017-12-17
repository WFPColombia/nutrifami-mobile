nutrifamiMobile.controller('TipsCtrl', function($ionicPlatform, $scope, $rootScope, $location, $stateParams, MediaService, UserService, CapacitacionService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UserService.getUser();
        
        CapacitacionService.initClient();
        

        $scope.audios = {};
        $scope.modulos = [];
        // Obtenemos los ids de los modulos de la capacitación 3

        $scope.mids = CapacitacionService.getModulosId(3);
        /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
        for (var mid in $scope.mids) {
            var tempModulo = CapacitacionService.getModulo($scope.mids[mid]);
            console.log(tempModulo);
            $scope.audios["modulo" + tempModulo.id] = $rootScope.TARGETPATH + tempModulo.titulo.audio.nombre;
            $scope.modulos.push(tempModulo);
        }

        console.log($scope.audios);

        MediaService.preloadSimple($scope.audios);

        $scope.playAudio = function(audio) {
            console.log(audio);
            MediaService.play(audio, $scope.audios);
        };

        $scope.ir = function(id) {
            MediaService.unload($scope.audios);
            $location.path('/tips/' + id);
        };

    });



});
