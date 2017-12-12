/*global angular*/
/*global angular*/
nutrifamiMobile.controller('LeccionTerminadaCtrl', function ($scope, $rootScope, $stateParams, $timeout, $location, $ionicPlatform, $ionicPopup, MediaService, CapacitacionService, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {

        $scope.usuarioActivo = UserService.getUser();
        console.log($scope.usuarioActivo);
        $scope.leccion = CapacitacionService.getLeccion($stateParams.leccion);
        var avanceModulo = UserService.getAvanceModulo($stateParams.modulo);


        $scope.audios = {
            'leccionCompletada': MediaService.getMediaURL('audios/muy-bien-leccion-completada.mp3'),
            /*'audioPuntos': 'audios/' + $scope.leccion.finalizado.puntos + '-puntos-ganados.mp3',*/
            'audioFinalizado': $rootScope.TARGETPATH + $scope.leccion.finalizado.audio.nombre,
        };


        MediaService.preloadSimple($scope.audios, function (response) {
            $scope.audios = response;
        });

        console.log(UserService.getAvanceModulo($stateParams.modulo));
        
        $timeout(function () {
            $scope.playAudio('audioFinalizado');
        }, 1000);

        $scope.playAudio = function (audio) {
            MediaService.play(audio, $scope.audios);
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
                                MediaService.unload($scope.audios);
                                $location.path('/app/' + $stateParams.capacitacion + '/' + $stateParams.modulo);
                            }
                        }
                    ]
                });

            } else {
                MediaService.unload($scope.audios);
                $location.path('/app/' + $stateParams.capacitacion + '/' + $stateParams.modulo);

            }
        };
    });
});
