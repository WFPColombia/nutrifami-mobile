/*global angular*/
/*global angular*/
nf2.controller('CapUnitEndCtrl', function ($scope, $rootScope, $stateParams, $location, $ionicPlatform, $ionicPopup, MediaService, CapacitationService, UserService, DownloadService) {
    'use strict';

    $ionicPlatform.ready(function () {

        $scope.usuarioActivo = UserService.getUser();
        $scope.leccion = CapacitationService.getLesson($stateParams.lesson);
        $scope.media_downloaded = DownloadService.paqueteDescargado('modulos', $stateParams.module, 'audios');
        $scope.assetpath = $rootScope.TARGETPATH + $stateParams.capacitation + "/" + $stateParams.module + "/";
        $scope.assetpath_audio = $rootScope.TARGETPATH_AUDIO + $stateParams.capacitation + "/" + $stateParams.module + "/";

        var avanceModulo = UserService.getAvanceModulo($stateParams.module);

        console.log($scope.leccion)

        $scope.audios = {
            audioFinalizado: $scope.assetpath_audio + $scope.leccion.finalizado.audio.nombre
        };
        
        console.log($scope.audios);

        $scope.playAudio = function (audio) {
            if ($scope.media_downloaded) {
                MediaService.play(audio);
            }
        };

        $scope.continuar = function () {
            if (avanceModulo.completo) {
                $scope.modulo = CapacitationService.getModule($stateParams.module);
                $scope.diplomaTitulo = $scope.modulo.titulo.texto;
                $ionicPopup.show({
                    templateUrl: 'modals/certificate/certificate.modal.html',
                    scope: $scope,
                    cssClass: 'diploma',
                    buttons: [
                        /*{
                         text: 'Descargar',
                         type: 'button-positive',
                         onTap: function(e) {
                         $scope.descargar
                         ();
                         }
                         }
                         , */
                        {
                            text: 'Continuar',
                            type: 'button-positive',
                            onTap: function (e) {
                                MediaService.unload();
                                $location.path('/app/' + $stateParams.capacitation + '/' + $stateParams.module);
                            }
                        }
                    ]
                });
            } else {
                MediaService.unload();
                $location.path('/app/' + $stateParams.capacitation + '/' + $stateParams.module);
            }
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeSuccess');
            console.log(fromState.name);
            if (fromState.name === 'cap_unit') {
                MediaService.preloadSimple($scope.audios, function () {
                    $scope.playAudio('audioFinalizado');
                });
            }
        });



    });
});
