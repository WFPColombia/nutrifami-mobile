/*global angular*/
nf2.controller('UnidadCtrl', function ($ionicPlatform, $scope, $rootScope, $location, $stateParams, $ionicPopup, $ionicLoading, $ionicViewSwitcher, $timeout, MediaService, UserService, CapacitacionService, DescargaService, TrainingService) {
    'use strict';
    $ionicPlatform.ready(function () {

        $scope.unidad = CapacitacionService.getUnidad($stateParams.leccion, $stateParams.unidad);
        $scope.usuarioActivo = UserService.getUser();
        $scope.estadoUnidad = 'espera';

        $scope.unidad.numeroUnidad = $stateParams.unidad;
        $scope.unidad.totalUnidades = CapacitacionService.getUnidadesActivas($stateParams.leccion).length;
        $scope.scrolled = false;
        $scope.audiosDescargados = DescargaService.paqueteDescargado('modulos', $stateParams.modulo, 'audios');

        $scope.assetpath = $rootScope.TARGETPATH + $stateParams.capacitacion + "/" + $stateParams.modulo + "/" + $stateParams.leccion + "/" + $scope.unidad.id + "/";
        $scope.assetpath_audio = $rootScope.TARGETPATH_AUDIO + $stateParams.capacitacion + "/" + $stateParams.modulo + "/" + $stateParams.leccion + "/" + $scope.unidad.id + "/";
        $scope.audios = {
            tipo: $scope.assetpath_audio + $scope.unidad.instruccion.audio.nombre,
            titulo: $scope.assetpath_audio + $scope.unidad.titulo.audio.nombre,
            texto: $scope.assetpath_audio + $scope.unidad.media.nombre,
            salir: MediaService.getMediaURL('audios/unidad-salir.wav')
        };

        $scope.feedback = {};
        $scope.textoBoton = 'Calificar';
        var tempOpciones = [];

        //Limpiamos el objeto de las opciones que no se deben mostrar
        for (var i in $scope.unidad.opciones) {
            if ($scope.unidad.opciones[i].visible == 0) {
                delete $scope.unidad.opciones[i];
            }
        }
        /* Validamos el tipo de actividad
         * if - Si es parejas ponemos las imagenes de primeras y los textos abajo
         * else - Si es otro tipo de unidad, desorganizamos las opciones */

        if ($scope.unidad.tipo.id == 2) {
            var tempImagenes = [];
            /* Recorre todo el objeto de las opciones para crear el arreglo*/
            for (var i in $scope.unidad.opciones) {
                if ($scope.unidad.opciones[i].columna == 1) {
                    tempImagenes.push($scope.unidad.opciones[i]);
                } else {
                    tempOpciones.push($scope.unidad.opciones[i]);
                }
            }

            /* Se mezclan los arreglos */
            shuffle(tempImagenes);
            shuffle(tempOpciones);

            var opcionesUnidad = [];
            /* Se concatenan los arreglos elemento por elemento, con las imagenes primero y las opciones despues */
            for (var i = 0; i < tempImagenes.length; i++) { /* CAMBIO DE FORMA DE LLENADO DEL ARREGLO */
                opcionesUnidad.push(tempImagenes[i]);
                opcionesUnidad.push(tempOpciones[i]);
            }
            $scope.unidad.opciones = opcionesUnidad;
        } else {
            for (var i in $scope.unidad.opciones) {
                tempOpciones.push($scope.unidad.opciones[i]);
            }
            shuffle(tempOpciones);
            $scope.unidad.opciones = tempOpciones;

            //Si es unidad informativa se crea el timer para habilitar el botón de seguir
            if ($scope.unidad.tipo.id == 1) {
                $timeout(function () {
                    $scope.botonCalificar = true;
                    $scope.textoBoton = 'continuar';
                }, 10000);

            }
        }

        /* Obtenemos la cantidad de respuestas correctas*/
        var respuestasCorrectas = 0;
        var respuestasSeleccionadas = 0;
        for (var i in $scope.unidad.opciones) {
            if ($scope.unidad.opciones[i].correcta == 1) {
                respuestasCorrectas++;
            }
            $scope.unidad.opciones[i].selected = false;
            $scope.unidad.opciones[i].evaluacion = false;
            $scope.unidad.opciones[i].pareja = '';
            $scope.unidad.opciones[i].match = false;
            $scope.audios['opcion' + $scope.unidad.opciones[i].id] = $scope.assetpath_audio + $scope.unidad.opciones[i].audio.nombre;
            $scope.audios['feedback' + $scope.unidad.opciones[i].id] = $scope.assetpath_audio + $scope.unidad.opciones[i].feedback.audio.nombre;
        }

        $scope.botonCalificar = false;

        $scope.seleccionarOpcion = function (index) {
            if ($scope.unidad.opciones[index].selected) {
                $scope.unidad.opciones[index].selected = false;
                respuestasSeleccionadas--;
            } else {
                $scope.unidad.opciones[index].selected = true;
                respuestasSeleccionadas++;
            }

            if (respuestasCorrectas === 1) {
                for (var i in $scope.unidad.opciones) {
                    if (i !== index) {
                        if ($scope.unidad.opciones[i].selected) {
                            $scope.unidad.opciones[i].selected = false;
                            $scope.unidad.opciones[i].evaluacion = false;
                            respuestasSeleccionadas--;
                        }
                    }
                }
            }
            if (respuestasSeleccionadas === respuestasCorrectas) {
                $scope.botonCalificar = true;
            } else {
                $scope.botonCalificar = false;
            }
        };

        var parejasContador = 0;
        var pareja1Orden = 0;
        var pareja2Orden = 0;
        var pareja1Pos = 0;
        var pareja2Pos = 0;
        var parejasCorrectas = 0;

        $scope.seleccionarPareja = function (index) {
            /* Verifica si es una opcion que no ha hecho match para poderla seleccionar*/
            if (!$scope.unidad.opciones[index].match) {

                for (var i in $scope.unidad.opciones) {
                    $scope.unidad.opciones[i].fallo = false;
                }

                /* Toggle para seleccionar y deseleccionar tarjeta*/
                if ($scope.unidad.opciones[index].selected) {
                    $scope.unidad.opciones[index].selected = false;
                    /*Si se deselecciona la carta se resta del contador*/
                    parejasContador--;
                } else {
                    $scope.unidad.opciones[index].selected = true;
                    /*Almacenar la respuesta correcta para validar más adelante si es una pareja*/

                    parejasContador++;
                    if (parejasContador === 1) {
                        pareja1Orden = $scope.unidad.opciones[index].orden;
                        pareja1Pos = index;
                    } else if (parejasContador === 2) {
                        pareja2Orden = $scope.unidad.opciones[index].orden;
                        pareja2Pos = index;

                        if (pareja1Orden === pareja2Orden) {
                            /*Estilos para la pareja actual*/
                            $scope.unidad.opciones[pareja2Pos].selected = false;
                            $scope.unidad.opciones[pareja2Pos].match = true;

                            /*Estilos para pareja anterior*/
                            $scope.unidad.opciones[pareja1Pos].selected = false;
                            $scope.unidad.opciones[pareja1Pos].match = true;

                            parejasContador = 0;
                            pareja1Pos = 0;
                            pareja2Pos = 0;
                            pareja1Orden = 0;
                            pareja2Orden = 0;

                            parejasCorrectas++;

                            if (parejasCorrectas == ($scope.unidad.opciones.length / 2)) {
                                /*Si las parejas correctas es igual a la mitad de la cantidad de opciones habilitar el botón de continuar*/
                                $scope.estadoUnidad = 'acierto';
                                $ionicPopup.show({
                                    templateUrl: 'views/template/feedback.tpl.html',
                                    scope: $scope,
                                    buttons: [{
                                            text: 'Continuar',
                                            type: 'button-positive',
                                            onTap: function (e) {
                                                $scope.cerrarFeedback();
                                            }
                                        }]
                                });
                            }
                        } else {
                            $scope.unidad.opciones[pareja2Pos].pareja = '';
                            $scope.unidad.opciones[pareja2Pos].selected = false;
                            $scope.unidad.opciones[pareja2Pos].match = false;
                            $scope.unidad.opciones[pareja2Pos].fallo = true;
                            $scope.unidad.opciones[pareja1Pos].pareja = '';
                            $scope.unidad.opciones[pareja1Pos].selected = false;
                            $scope.unidad.opciones[pareja1Pos].match = false;
                            $scope.unidad.opciones[pareja1Pos].fallo = true;

                            parejasContador = 0;
                            pareja1Pos = 0;
                            pareja2Pos = 0;
                            pareja1Orden = 0;
                            pareja2Orden = 0;
                        }
                    }
                }
            }
        };

        $scope.calificarUnidad = function () {
            var textoBoton = '';
            var respuestasAcertadas = 0;
            var feedbacks_ok = [];
            var feedbacks_ok_last = '';
            var feedbacks_bad = [];
            var feedbacks_bad_last = '';
            if ($scope.unidad.tipo.id == 1) {
                $scope.irASiguienteUnidad();
                return;
            }

            $scope.feedback = {
                feedbacks: []
            };

            for (var i in $scope.unidad.opciones) {
                if ($scope.unidad.opciones[i].selected) {
                    $scope.unidad.opciones[i].evaluacion = true;
                    if ($scope.unidad.opciones[i].selected == $scope.unidad.opciones[i].correcta) {
                        respuestasAcertadas++;
                        feedbacks_ok.push({
                            texto: $scope.unidad.opciones[i].feedback.texto,
                            nombre: 'feedback' + $scope.unidad.opciones[i].id
                        });
                        feedbacks_ok_last = 'feedback' + $scope.unidad.opciones[i].id;
                    } else {
                        feedbacks_bad.push({
                            texto: $scope.unidad.opciones[i].feedback.texto,
                            nombre: 'feedback' + $scope.unidad.opciones[i].id
                        });
                        feedbacks_bad_last = 'feedback' + $scope.unidad.opciones[i].id;

                    }


                }
            }

            if (respuestasAcertadas === respuestasCorrectas) {
                $scope.estadoUnidad = 'acierto';
                $scope.feedback.feedbacks = feedbacks_ok;
                $scope.playAudio(feedbacks_ok_last);
                textoBoton = 'Continuar';
            } else {
                $scope.estadoUnidad = 'fallo';
                $scope.feedback.feedbacks = feedbacks_bad;
                $scope.playAudio(feedbacks_bad_last);
                textoBoton = 'Intentar de nuevo';
            }

            $scope.feedback.feedbacks = eliminarRepitidos($scope.feedback.feedbacks, 'texto');

            $ionicPopup.show({
                templateUrl: 'views/template/feedback.tpl.html',
                scope: $scope,
                buttons: [{
                        text: textoBoton,
                        type: 'button-positive',
                        onTap: function (e) {
                            $scope.cerrarFeedback();
                        }
                    }]
            });
        };

        $scope.cerrarFeedback = function () {
            if ($scope.estadoUnidad === 'acierto') {
                $scope.irASiguienteUnidad();
            } else {
                $scope.reiniciarUnidad();
            }
        };

        $scope.salirUnidad = function () {
            $ionicPopup.show({
                templateUrl: 'views/template/salirUnidad.tpl.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: 'Salir de la lección',
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                            $location.path('/app/' + $stateParams.capacitacion + '/' + $stateParams.modulo);
                        }
                    }]
            });
        };

        $scope.irASiguienteUnidad = function () {
            $scope.siguienteUnidad = parseInt($stateParams.unidad) + 1;
            if ($scope.siguienteUnidad > $scope.unidad.totalUnidades) {
                var data = {
                    capacitacion: $stateParams.capacitacion,
                    modulo: $stateParams.modulo,
                    leccion: $stateParams.leccion
                };
                // Oberlay Cargando mientras se guarda el avance
                $ionicLoading.show({
                    template: 'Guardando Avance...',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 40
                });
                if (TrainingService.isTraineeActive()) {
                    console.log('Save trainee advance');
                    data['synchronized'] = false;
                    TrainingService.saveTraineeAdvance(data);
                } else {
                    console.log('Save normal advance');
                    UserService.createAvance(data);
                }
            } else {
                $location.path('/' + $stateParams.capacitacion + '/' + $stateParams.modulo + "/" + $stateParams.leccion + "/" + $scope.siguienteUnidad);
            }
        };

        $scope.reiniciarUnidad = function () {
            for (var i in $scope.unidad.opciones) {
                $scope.unidad.opciones[i].selected = false;
                $scope.unidad.opciones[i].evaluacion = false;
                respuestasSeleccionadas = 0;
            }
            $scope.estadoUnidad = 'espera';
            $scope.botonCalificar = false;
        };

        $scope.porcentajeAvance = function () {
            return (100 / $scope.unidad.totalUnidades * ($scope.unidad.numeroUnidad - 1));
        };

        $scope.playAudio = function (audio) {
            MediaService.play(audio);
        };

        $scope.getScrollPosition = function () {/*if ($ionicScrollDelegate.getScrollPosition().top > 50) {if (!$scope.scrolled) {$scope.$apply(function() {$scope.scrolled = true;});}} else {if ($scope.scrolled) {$scope.$apply(function() {$scope.scrolled = false;});}}*/
        };

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeSuccess');
            if (toParams.unidad == $scope.unidad.numeroUnidad || fromState.name == 'app.modulo') {
                MediaService.preloadSimple($scope.audios, function () {
                    if ($scope.audiosDescargados) {
                        MediaService.play('titulo');
                    }
                });
            }
        });

        $scope.$on('avanceSaved', function (event, id) {
            $ionicLoading.hide();
            $location.path('/' + $stateParams.capacitacion + '/' + $stateParams.modulo + "/" + $stateParams.leccion + "/" + $stateParams.unidad + "/leccion-terminada");
        });

        $scope.$on('avanceFaliedSave', function (event, id) {
            $ionicLoading.hide();
            $location.path('/' + $stateParams.capacitacion + '/' + $stateParams.modulo + "/" + $stateParams.leccion + "/" + $stateParams.unidad + "/leccion-terminada");
        });

        /**
         * Shuffles array in place.
         * @param {Array} a items The array containing the items.
         */
        function shuffle(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        }

        function eliminarRepitidos(myList, reference) {
            myList.sort(dynamicSort(reference));

            var tempList = [];
            tempList.push(myList[0]);
            for (var i = 1; i < myList.length; i++) {
                if (myList[i][reference] != myList[i - 1][reference]) {
                    tempList.push(myList[i]);
                }
            }
            return tempList;
        }

        function dynamicSort(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            };
        }
    });
});