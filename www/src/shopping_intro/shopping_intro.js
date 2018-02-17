nf2.controller('ShoppingIntroCtrl', function ($ionicPlatform, $location, $scope, $rootScope, $ionicPopup, UserService, MediaService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.audios = {
            audio1: MediaService.getMediaURL('audios/compras-intro-1.wav'),
            audio2: MediaService.getMediaURL('audios/compras-intro-2.wav')
        };
        $scope.usuarioActivo = UserService.getUser();

        $scope.goTo = function () {
            $location.path('/app/mis-compras');
        };

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
            $ionicPopup.alert({
                title: "Sin conexión a Internet",
                content: "Actualmente su equipo no tiene conexión a Internet. Para ver esta sección debe estár conectado a Internet ",
                buttons: [
                    {text: 'Salir'}
                ]
            })
                    .then(function (res) {
                        $location.path('/app/capacitacion');
                    });
        }

    });
});
