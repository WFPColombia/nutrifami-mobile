nf2.controller('ShoppingIntroCtrl', function ($ionicPlatform, $state, $scope, $rootScope, $ionicPopup, UserService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.audios = {
            audio1: MediaService.getMediaURL('audios/compras-intro-1.wav'),
            audio2: MediaService.getMediaURL('audios/compras-intro-2.wav')
        };
        $scope.usuarioActivo = UserService.getUser();


        $scope.playAudio = function (audio) {
            MediaService.play(audio);
        };

        $scope.$on("$ionicView.enter", function (event, data) {
            MediaService.preloadSimple($scope.audios);
        });


        $scope.$on("$ionicView.beforeLeave", function (event, data) {
            MediaService.unload();
        });

        if ($rootScope.isOffline) {
            $scope.modal = {
                texto1: 'Sin conexión a Internet',
                texto2: 'Actualmente su equipo no tiene conexión a Internet. Para ver esta sección debe estár conectado a Internet',
                estado: 'error' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: 'Salir',
                        type: 'button-positive',
                        onTap: function (e) {
                            $state.go('nf.cap_home');
                        }
                    }]
            });


        }

    });
});
