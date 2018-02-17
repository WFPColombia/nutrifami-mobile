/*global angular*/
/*global angular*/
nf2.controller('LeccionTerminadaCtrl', function ($scope, $rootScope, $stateParams, $location, $ionicPlatform, $ionicPopup, MediaService, CapacitacionService, UserService, DescargaService) {
    'use strict';

    $ionicPlatform.ready(function () {

        $scope.usuarioActivo = UserService.getUser();
        $scope.leccion = CapacitacionService.getLeccion($stateParams.leccion);
        $scope.media_downloaded = DescargaService.paqueteDescargado('modulos', $stateParams.modulo, 'audios');
        $scope.assetpath = $rootScope.TARGETPATH + $stateParams.capacitacion + "/" + $stateParams.modulo + "/";
        $scope.assetpath_audio = $rootScope.TARGETPATH_AUDIO + $stateParams.capacitacion + "/" + $stateParams.modulo + "/";

        var avanceModulo = UserService.getAvanceModulo($stateParams.modulo);

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
                $scope.modulo = CapacitacionService.getModulo($stateParams.modulo);
                $scope.diplomaTitulo = $scope.modulo.titulo.texto;
                $ionicPopup.show({
                    templateUrl: 'modals/diploma.modal.html',
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
                                $location.path('/app/' + $stateParams.capacitacion + '/' + $stateParams.modulo);
                            }
                        }
                    ]
                });
            } else {
                MediaService.unload();
                $location.path('/app/' + $stateParams.capacitacion + '/' + $stateParams.modulo);
            }
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeSuccess');
            console.log(fromState.name);
            if (fromState.name === 'unidad' && $scope.media_downloaded) {
                MediaService.preloadSimple($scope.audios, function () {
                    MediaService.play('audioFinalizado');
                });
            }
        });

    });
});
