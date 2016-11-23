/*global angular*/
nutrifamiMobile.controller('UnidadController', function($ionicPlatform, $scope, $rootScope, $location, $stateParams, $ionicPopup, $ionicLoading, $ionicViewSwitcher, $timeout, $ionicScrollDelegate, MediaService, UsuarioService, CapacitacionService) {
    'use strict';
    $ionicPlatform.ready(function() {

        nutrifami.training.initClient('', function() { //BEGIN CORDOVA FILES.
            $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
            $scope.estadoUnidad = 'espera';

            $scope.unidad = CapacitacionService.getUnidad($stateParams.leccion, $stateParams.unidad);
            $scope.unidad.numeroUnidad = $stateParams.unidad;
            $scope.unidad.totalUnidades = CapacitacionService.getUnidadesActivas($stateParams.leccion).length;
            $scope.scrolled = false;

            /*$scope.audios = {
                'tipo': MediaService.getMediaURL("audios/" + $scope.unidad.tipo.audio.nombre),
                'titulo': $rootScope.TARGETPATH + $scope.unidad.titulo.audio.nombre,
                'muyBien': MediaService.getMediaURL('audios/muy-bien.mp3'),
                'respuestaIncorrecta': MediaService.getMediaURL('audios/respuesta-incorrecta.mp3'),
                'salir': MediaService.getMediaURL('audios/unidad-salir.mp3')
            };*/

            $scope.audios = {};

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
                    /* Si la opción tiene imagen, se activan los estilos de las imagenes*/
                    if (typeof $scope.unidad.opciones[i].media !== 'undefined') {
                        $scope.hayImagen = true;
                    }
                    /* Si el texto es corto (titulo se almacena en un arreglo temporal)*/
                    if ($scope.unidad.opciones[i].texto.length <= 30) {
                        tempImagenes.push($scope.unidad.opciones[i]);
                    } else { /* Si no, se guardan en otro arreglo*/
                        tempOpciones.push($scope.unidad.opciones[i]);
                    }
                }

                /* Se mezclan los arreglos */
                shuffle(tempImagenes);
                shuffle(tempOpciones);

                var opcionesUnidad = [];
                /* Se concatenan los arreglos elemento por elemento, con las imagenes primero y las opciones despues */
                for (var i = 0; i < 10; i++) { /* CAMBIO DE FORMA DE LLENADO DEL ARREGLO */
                    if (typeof tempImagenes[i] !== 'undefined') {
                        opcionesUnidad.push(tempImagenes[i]);
                    }
                    if (typeof tempOpciones[i] !== 'undefined') {
                        opcionesUnidad.push(tempOpciones[i]);
                    }
                }
                if (typeof opcionesUnidad !== 'undefined' && opcionesUnidad.length > 0) {
                    $scope.unidad.opciones = opcionesUnidad;
                }

            } else {
                for (var i in $scope.unidad.opciones) {
                    tempOpciones.push($scope.unidad.opciones[i]);
                }
                shuffle(tempOpciones);
                $scope.unidad.opciones = tempOpciones;

                //Si es unidad informativa se crea el timer para habilitar el botón de seguir

                if ($scope.unidad.tipo.id == 1) {
                    $timeout(function() {
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

                /*Verifica si la opcion tienen audio y lo carga*/
                if (typeof $scope.unidad.opciones[i].audio !== 'undefined') {
                    $scope.unidad.opciones[i].audio.id = "opcion" + i;
                    $scope.audios[$scope.unidad.opciones[i].audio.id] = $rootScope.TARGETPATH + $scope.unidad.opciones[i].audio.nombre;
                }
            }

            $scope.botonCalificar = false;
            /*
                        MediaService.preloadSimple($scope.audios, function(response) {
                            $scope.audios = response;
                        });*/

            $scope.seleccionarOpcion = function(index) {
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

            $scope.seleccionarPareja = function(index) {
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

                                /*ngAudio.play("audios/sound-ok.mp3");*/
                                /*ngAudio.play("audios/muy-bien.mp3");*/

                                parejasCorrectas++;

                                if (parejasCorrectas == ($scope.unidad.opciones.length / 2)) {
                                    /*Si las parejas correctas es igual a la mitad de la cantidad de opciones habilitar el botón de continuar*/
                                    $scope.estadoUnidad = 'acierto';
                                    $scope.feedback = {};
                                    var tempFeedbackAudios = {};
                                    var tempFeedback = [{
                                        texto: $scope.unidad.opciones[i].feedback.texto,
                                        nombre: 'feedback' + i
                                            /*audio: ngAudio.load($rootScope.TARGETPATH + $scope.unidad.opciones[i].feedback.audio.nombre)*/
                                    }];

                                    tempFeedbackAudios['feedback' + i] = $rootScope.TARGETPATH + $scope.unidad.opciones[i].feedback.audio.nombre;
                                    $scope.feedback.feedbacks = tempFeedback;
                                    $scope.feedback.audios = tempFeedbackAudios;
                                    //$scope.feedback.audios.mensaje = MediaService.getMediaURL("audios/muy-bien-respuesta-correcta.mp3");
                                    $scope.feedback.mensaje = "Muy bien! respuesta correcta";

                                    /*ngAudio.play("audios/muy-bien.mp3");*/


                                    var popUpFeedback = $ionicPopup.show({
                                        templateUrl: 'views/template/feedback.tpl.html',
                                        scope: $scope,
                                        buttons: [{
                                            text: 'Continuar',
                                            type: 'button-positive',
                                            onTap: function(e) {
                                                //MediaService.unload($scope.feedback.audios);
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

                                if (navigator && navigator.vibrate) {
                                    navigator.vibrate([300, 100, 300]);
                                }

                            }
                        }
                    }

                }
            };

            $scope.calificarUnidad = function() {
                /* Validar si acerto o fallo*/

                if ($scope.unidad.tipo.id == 1) {
                    $scope.irASiguienteUnidad();
                    return;
                }

                var respuestasAcertadas = 0;
                var tempFeedbackAcierto = [];
                var tempFeedbackAciertoAudios = {};
                var tempFeedbackAciertoUltimoAudio = '';
                var tempFeedbackFallo = [];
                var tempFeedbackFalloAudios = {};
                var tempFeedbackFalloUltimoAudio = '';
                var tempFeedbackUltimoAudio = '';
                $scope.feedback = {};
                for (var i in $scope.unidad.opciones) {
                    if ($scope.unidad.opciones[i].selected) {
                        $scope.unidad.opciones[i].evaluacion = true;
                        if ($scope.unidad.opciones[i].selected == $scope.unidad.opciones[i].correcta) {
                            respuestasAcertadas++;
                            tempFeedbackAcierto.push({
                                texto: $scope.unidad.opciones[i].feedback.texto,
                                nombre: 'feedback' + i
                            });
                            tempFeedbackAciertoAudios['feedback' + i] = $rootScope.TARGETPATH + $scope.unidad.opciones[i].feedback.audio.nombre;
                            tempFeedbackAciertoUltimoAudio = 'feedback' + i;
                        } else {
                            tempFeedbackFallo.push({
                                texto: $scope.unidad.opciones[i].feedback.texto,
                                nombre: 'feedback' + i
                            });
                            tempFeedbackFalloAudios['feedback' + i] = $rootScope.TARGETPATH + $scope.unidad.opciones[i].feedback.audio.nombre;
                            tempFeedbackFalloUltimoAudio = 'feedback' + i;
                        }
                    }
                }
                if (respuestasAcertadas === respuestasCorrectas) {
                    $scope.estadoUnidad = 'acierto';
                    $scope.feedback.feedbacks = eliminarRepitidos(tempFeedbackAcierto, 'texto');
                    $scope.feedback.audios = tempFeedbackAciertoAudios;
                    //$scope.feedback.audios.mensaje = MediaService.getMediaURL("audios/muy-bien-respuesta-correcta.mp3");
                    $scope.feedback.mensaje = "Muy bien! respuesta correcta";
                    tempFeedbackUltimoAudio = tempFeedbackAciertoUltimoAudio;

                } else {
                    $scope.estadoUnidad = 'fallo';
                    $scope.feedback.feedbacks = eliminarRepitidos(tempFeedbackFallo, 'texto');
                    $scope.feedback.audios = tempFeedbackFalloAudios;
                    //$scope.feedback.audios.mensaje = MediaService.getMediaURL("audios/intenta-de-nuevo.mp3");
                    $scope.feedback.mensaje = "Intenta de nuevo! respuesta incorrecta";
                    tempFeedbackUltimoAudio = tempFeedbackFalloUltimoAudio;

                    if (navigator && navigator.vibrate) {
                        navigator.vibrate(1000);
                    }
                }

                var textoBoton = 'Intentar de nuevo';

                if ($scope.estadoUnidad === 'acierto') {
                    textoBoton = 'Continuar';
                }

                /*MediaService.preloadSimple($scope.feedback.audios, function(response) {
                    $scope.feedback.audios = response;
                    $scope.playAudioFeedback(tempFeedbackUltimoAudio);
                });*/

                // An elaborate, custom popup
                var popUpFeedback = $ionicPopup.show({
                    templateUrl: 'views/template/feedback.tpl.html',
                    scope: $scope,
                    buttons: [{
                        text: textoBoton,
                        type: 'button-positive',
                        onTap: function(e) {
                            // MediaService.unload($scope.feedback.audios);
                            $scope.cerrarFeedback();
                        }
                    }]
                });
            };

            $scope.cerrarFeedback = function() {
                if ($scope.estadoUnidad === 'acierto') {
                    $scope.irASiguienteUnidad();
                } else {
                    $scope.reiniciarUnidad();
                }

            };

            $scope.salirUnidad = function() {
                var popUpFeedback = $ionicPopup.show({
                    templateUrl: 'views/template/salirUnidad.tpl.html',
                    scope: $scope,
                    cssClass: 'salir-unidad',
                    buttons: [{
                        text: 'Salir de la lección',
                        type: 'button-positive',
                        onTap: function(e) {
                            //MediaService.unload($scope.audios);
                            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                            $location.path('/app/capacitacion/' + $stateParams.modulo);
                        }
                    }]
                });
            }

            $scope.irASiguienteUnidad = function() {
                $scope.siguienteUnidad = parseInt($stateParams.unidad) + 1;

                if ($scope.siguienteUnidad > $scope.unidad.totalUnidades) {
                    var usuarioAvance = UsuarioService.getUsuarioAvance();
                    if (typeof usuarioAvance['3'] === 'undefined') {
                        usuarioAvance['3'] = {};
                        usuarioAvance['3'][$stateParams.modulo] = {};
                    }

                    console.log(usuarioAvance['3']);
                    if (typeof usuarioAvance['3'][$stateParams.modulo] === 'undefined') {
                        usuarioAvance['3'][$stateParams.modulo] = {};
                    }
                    usuarioAvance['3'][$stateParams.modulo][$stateParams.leccion] = "true";

                    var data = {
                        'per_id': $scope.usuarioActivo.id,
                        'cap_id': 3,
                        'mod_id': $stateParams.modulo,
                        'lec_id': $stateParams.leccion
                    };

                    // Oberlay Cargando mientras se guarda el avance
                    $scope.loading = $ionicLoading.show({
                        template: 'Guardando Avance...',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 40
                    });

                    UsuarioService.setUsuarioAvance(usuarioAvance, data, function(response) {
                        $ionicLoading.hide();
                        if (response.success) {
                            $location.path('/capacitacion/' + $stateParams.modulo + "/" + $stateParams.leccion + "/" + $stateParams.unidad + "/leccion-terminada");
                        }
                    });


                } else {
                    //MediaService.unload($scope.audios);
                    $location.path('/capacitacion/' + $stateParams.modulo + "/" + $stateParams.leccion + "/" + $scope.siguienteUnidad);
                }
            };

            $scope.reiniciarUnidad = function() {
                for (var i in $scope.unidad.opciones) {
                    $scope.unidad.opciones[i].selected = false;
                    $scope.unidad.opciones[i].evaluacion = false;
                    respuestasSeleccionadas = 0;
                }
                $scope.estadoUnidad = 'espera';
                $scope.botonCalificar = false;
            };

            $scope.porcentajeAvance = function() {
                return (100 / $scope.unidad.totalUnidades * ($scope.unidad.numeroUnidad - 1));
            };

            $scope.playAudio = function(audio) {
                //MediaService.play(audio, $scope.audios);
            };

            $scope.playAudioFeedback = function(audio) {
                //MediaService.play(audio, $scope.feedback.audios);
            };

            $scope.getScrollPosition = function() {

                if ($ionicScrollDelegate.getScrollPosition().top > 50) {
                    if (!$scope.scrolled) {

                        $scope.$apply(function() {
                            $scope.scrolled = true;
                        });
                    }

                } else {
                    if ($scope.scrolled) {

                        $scope.$apply(function() {
                            $scope.scrolled = false;
                        });
                    }

                }
            }

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
                return function(a, b) {
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                };
            }
        }); //BEGIN CORDOVA FILES.
    });
});
