nutrifamiMobile.controller('TipsController', function($ionicPlatform, $scope, $location, $stateParams, AudioService, UsuarioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

        $scope.audios = {
            'audio1': 'audios/consejos-saludables-1.mp3',
            'audio2': 'audios/consejos-saludables-2.mp3',

        };


        $scope.modulos = [];
        // Obtenemos los ids de los modulos de la capacitación 3


        $scope.mids = nutrifami.training.getModulosId(3);
        /*Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas */
        for (var mid in $scope.mids) {
            var tempModulo = nutrifami.training.getModulo($scope.mids[mid]);
            $scope.audios["modulo" + tempModulo.id] = tempModulo.titulo.audio.url;
            $scope.modulos.push(tempModulo);
        }

        console.log($scope.audios);
        AudioService.preloadSimple($scope.audios);


        console.log($scope.modulos);

        $scope.playAudio = function(audio) {
            console.log(audio);
            AudioService.play(audio);
        };

        $scope.ir = function(id) {
            console.log(id);
            AudioService.unload($scope.audios);
            $location.path('/tips/' + id);
        };

    });



});
