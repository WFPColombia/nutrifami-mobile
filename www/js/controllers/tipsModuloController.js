nutrifamiMobile.controller('TipsModuloController', function($ionicPlatform, $scope, $location, $stateParams, AudioService, UsuarioService, TipsService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

        $scope.lecciones = [];


        /* Se hace un try por si el usuario intenta ingresar a la URL a otro modulo que lo  lleve al home */
        $scope.modulo = nutrifami.training.getModulo($stateParams.modulo);
        $scope.modulo.totalLecciones = 0;

        $scope.lids = nutrifami.training.getLeccionesId($stateParams.modulo);
        for (var lid in $scope.lids) {
            var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);

            if (tempLeccion.activo == 1) {
                $scope.lecciones.push(tempLeccion);
            }

        }

        //$scope.modulo.titulo.audio.audio = ngAudio.load($scope.modulo.titulo.audio.url);

        console.log($scope.lecciones);
        console.log($scope.modulo);


        $scope.grupos = [];

        for (var i in $scope.lecciones) {

            var tempGrupo = {
                name: $scope.lecciones[i].titulo.texto,
                items: []
            };

            tempGrupo.items = TipsService.getTipsByLeccion($scope.lecciones[i].id);

            $scope.grupos.push(tempGrupo);

        }

        console.log($scope.grupos);




        $scope.clickTip = function() {
            console.log("Click Tip");
        };

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

    });
});
