nf2.controller('TipsModuleCtrl', function ($ionicPlatform, $scope, $stateParams, UserService, CapacitationService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.usuarioActivo = UserService.getUser();
        $scope.modulo = CapacitationService.getModule($stateParams.module);
        $scope.lecciones = CapacitationService.getLessonsActives($stateParams.module);
        $scope.grupos = [];

        for (var i in $scope.lecciones) {
            var tempGrupo = {
                name: $scope.lecciones[i].titulo.texto,
                items: []
            };
            
            console.log($scope.lecciones[i].id);
            tempGrupo.items = CapacitationService.getTipsByLesson($scope.lecciones[i].id);

            $scope.grupos.push(tempGrupo);

        }

        $scope.clickTip = function (tip) {
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


        var onSuccess = function (result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }

        var onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        }


        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

    });
});
