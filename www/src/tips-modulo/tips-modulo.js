nutrifamiMobile.controller('TipsModuloCtrl', function($ionicPlatform, $scope, $stateParams, UserService, TipsService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UserService.getUser();

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




        $scope.clickTip = function(tip) {
            var options = {
                message: tip, // not supported on some apps (Facebook, Instagram)
                subject: 'Consejo Saludable Nutrifami', // fi. for email
                files: ['', ''], // an array of filenames either locally or remotely
                url: 'https://www.nutrifami.org/',
                chooserTitle: 'Eliga una aplicación para compartir' // Android only, you can override the default share sheet title
            }

            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

        };

        // this is the complete list of currently supported params you can pass to the plugin (all optional)


        var onSuccess = function(result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }

        var onError = function(msg) {
            console.log("Sharing failed with message: " + msg);
        }


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
