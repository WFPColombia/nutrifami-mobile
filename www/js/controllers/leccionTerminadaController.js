/*global angular*/
/*global angular*/
nutrifamiMobile.controller('LeccionTerminadaController', function($scope, $stateParams, $timeout, $location, $ionicPlatform, $ionicPopup, $ionicViewSwitcher, AudioService, CapacitacionService, UsuarioService) {
    'use strict';

    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.modulo = CapacitacionService.getModulo($stateParams.modulo);
        //scope.leccion = CapacitacionService.getLeccion($stateParams.modulo);
        $scope.leccion = nutrifami.training.getLeccion($stateParams.leccion);
        console.log(nutrifami.training);

        console.log($stateParams.leccion)

        $scope.audios = {
            'leccionCompletada': 'audios/muy-bien-leccion-completada.mp3',
            'audioPuntos': 'audios/' + $scope.leccion.finalizado.puntos + '-puntos-ganados.mp3',
            'audioFinalizado': 'assets/' + $scope.leccion.finalizado.audio.nombre,
        };
        AudioService.preloadSimple($scope.audios);

        var diploma = false;



        $timeout(function() {
            AudioService.play('leccionCompletada');
        }, 1000);

        //$scope.leccionCompletada = {};
        //$scope.leccionCompletada.audio = ngAudio.load("audios/muy-bien-leccion-completada.mp3");

        //$scope.leccion.finalizado.audio.audio = ngAudio.load("assets/" + $scope.leccion.finalizado.audio.nombre);
        //$scope.leccion.finalizado.audio.audioPuntos = ngAudio.load("audios/" + $scope.leccion.finalizado.puntos + "-puntos-ganados.mp3");

        $scope.lecciones = CapacitacionService.getLeccionesActivas($stateParams.modulo);
        $scope.usuarioAvance = UsuarioService.getUsuarioAvance();

        if ($scope.lecciones.length == Object.keys($scope.usuarioAvance[3][$stateParams.modulo]).length) {
            diploma = true;
        }


        $scope.playAudio = function(audio) {
            AudioService.play(audio);
        };

        $scope.continuar = function() {

            if (diploma) {

                $scope.diplomaTitulo = $scope.modulo.titulo.texto

                var popUpDiploma = $ionicPopup.show({
                    templateUrl: 'views/modals/diploma.modal.html',
                    scope: $scope,
                    cssClass: 'diploma',
                    buttons: [
                        /*{
                                                text: 'Descargar',
                                                type: 'button-positive',
                                                onTap: function(e) {
                                                    $scope.descargar();
                                                }
                                            }
                                            , */
                        {
                            text: 'Continuar',
                            type: 'button-positive',
                            onTap: function(e) {
                                //MediaService.unload($scope.audios);

                            }
                        }
                    ]
                });

            } else {
                AudioService.unload($scope.audios);
                $location.path("/app/capacitacion/" + $stateParams.modulo);

            }
        };
    });
});
