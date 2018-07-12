/*global angular*/
nf2.controller('CapUnitCtrl', function ($ionicPlatform, $scope, $rootScope, $state, $filter, $stateParams, $ionicPopup, $ionicLoading, $ionicViewSwitcher, $timeout, MediaService, UserService, CapacitationService, DownloadService, TrainingService) {
    'use strict';
    $ionicPlatform.ready(function () {

        // Preparing variables
        $scope.unidad = CapacitationService.getUnitFromOrder($stateParams.lesson, $stateParams.unit);
        $scope.estadoUnidad = 'espera';
        $scope.unidad.numeroUnidad = $stateParams.unit;
        $scope.unidad.totalUnidades = CapacitationService.getUnitsActives($stateParams.lesson).length;
        $scope.scrolled = false;
        $scope.audiosDescargados = DownloadService.paqueteDescargado('modulos', $stateParams.module, 'audios');
        $scope.assetpath_audio = $rootScope.TARGETPATH_AUDIO + $stateParams.capacitation + "/" + $stateParams.module + "/" + $stateParams.lesson + "/" + $scope.unidad.id + "/";

        if ($rootScope.isMobile) {
            $scope.assetpath = $rootScope.TARGETPATH + $stateParams.capacitation + "/" + $stateParams.module + "/" + $stateParams.lesson + "/" + $scope.unidad.id + "/";
        } else {
            $scope.assetpath = $rootScope.TARGETPATH;
        }
        
        $scope.feedback = {};
        $scope.textoBoton = 'Calificar';
        $scope.advancePercentage = 100 / $scope.unidad.totalUnidades * ($scope.unidad.numeroUnidad - 1);
        $scope.botonCalificar = false;
        $scope.correctOptions = 0
        $scope.selectedOptions = 0


        

        // Preparamos los audios generales

        $scope.audios = {
                type: $scope.assetpath_audio + $scope.unidad.instruccion.audio.nombre,
                title: $scope.assetpath_audio + $scope.unidad.titulo.audio.nombre,
                texto: $scope.assetpath_audio + $scope.unidad.media.nombre,
                salir: MediaService.getMediaURL('audios/unidad-salir.wav')
            };

        // Limpiamos el objeto de las opciones que no se deben mostrar
        for (var i in $scope.unidad.opciones) {
            if ($scope.unidad.opciones[i].visible === 0) {
                delete $scope.unidad.opciones[i];
            }
        }

        // Preparamos las opciones según el tipo de unidad
        if ( $scope.unidad.tipo.id === '2' ){
            $scope.unidad.opciones = preparePairsOptions($scope.unidad)
        } else {
            $scope.unidad.opciones = prepareSimpleOptions($scope.unidad)
        }


        //Si es unidad informativa se crea el timer para habilitar el botón de seguir
        if ($scope.unidad.tipo.id == 1) {
            $timeout(function () {
                $scope.botonCalificar = true;
                $scope.textoBoton = 'continuar';
            }, 10000);
        }

        // Esperamos tres segundos para saber el tamaño de unit, si es muy grande ponemos la animacion de scroll

        $timeout(function () {
                var elementUnit = document.getElementById("unit");
                var windowsHeight = window.innerHeight;
                console.log(elementUnit.offsetHeight, windowsHeight, elementUnit.offsetHeight >= ( windowsHeight - 40 ))
                if(elementUnit.offsetHeight >= ( windowsHeight - 40 )){
                    console.log('Animación scrolling')
                }else{
                    console.log('No es necesario la animación')
                }
        }, 3000);

        

        $scope.choiceOption = function (index) {
            
            if ($scope.unidad.opciones[index].selected) {
                $scope.unidad.opciones[index].selected = false;
                $scope.selectedOptions--;
            } else {
                $scope.playAudio('option' + $scope.unidad.opciones[index].id);
                $scope.unidad.opciones[index].selected = true;
                $scope.selectedOptions++;
            }
            if ($scope.correctOptions === 1) {
                for (var i in $scope.unidad.opciones) {
                    if (parseInt(i) !== index) {
                        if ($scope.unidad.opciones[i].selected) {
                            $scope.unidad.opciones[i].selected = false;
                            $scope.unidad.opciones[i].evaluacion = false;
                            $scope.selectedOptions--;
                        }
                    }
                }
            }
            // Si la cantidad de pregutnas seleccionadas es igual a la cantidad de opciones correctas habilitamos el botón de calificar
            if ($scope.selectedOptions === $scope.correctOptions) {
                $scope.botonCalificar = true;
            } else {
                $scope.botonCalificar = false;
            }
        };

        $scope.chociePair = function (index, column, otherColumn) {
            var counter = 0;
            var pairNumberColum = $scope.unidad.opciones[column][index].orden
            var pairNumberOtherColum = 0
            var otherIndex = 0
            var comparePair = false

             /* Verifica si es una opcion que no ha hecho match para poderla seleccionar*/
            if (!$scope.unidad.opciones[column][index].match) {
                for (var i in $scope.unidad.opciones[column]) {
                    if (i == index) {
                        if(!$scope.unidad.opciones[column][index].selected){
                            $scope.playAudio('option' + $scope.unidad.opciones[column][index].id);
                        }
                        $scope.unidad.opciones[column][index].selected = !$scope.unidad.opciones[column][index].selected
                        $scope.unidad.opciones[column][i].fallo = false;
                    } else {
                        $scope.unidad.opciones[column][i].selected = false;
                        $scope.unidad.opciones[column][i].fallo = false; // Cambiamos el estado a false para que se vea la animación en caso de fallo
                    }
                }
            } else {
                return
            }
           

            //validamos si en la otra columna hay una opcion seleccionada para comparar las respuestas en el siguiente if
            for (var i in $scope.unidad.opciones[otherColumn]){
                $scope.unidad.opciones[otherColumn][i].fallo = false // Cambiamos el estado a false para que se vea la animación en caso de fallo
                if($scope.unidad.opciones[otherColumn][i].selected){
                    comparePair = true
                    pairNumberOtherColum = $scope.unidad.opciones[otherColumn][i].orden
                    otherIndex = i
                }

            }
           
            // Comparamos las respuestas
            if (comparePair) {
                console.log('if comparePair')
                // Si hay match, cambiamos los estilos
                if(pairNumberColum == pairNumberOtherColum){
                    console.log('hay match')
                    $scope.unidad.opciones[column][index].match = true;
                    $scope.unidad.opciones[column][index].selected = false;
                    
                    $scope.unidad.opciones[otherColumn][otherIndex].match = true;
                    $scope.unidad.opciones[otherColumn][otherIndex].selected = false;

                    $scope.correctOptions++
                } else { // Si no hay match, reiniciamos los estilos
                    console.log('no hay match')
                    $scope.unidad.opciones[column][index].selected = false;
                    $scope.unidad.opciones[column][index].match = false;
                    $scope.unidad.opciones[column][index].fallo = true;  // Para ver la animación cuando se falla

                    $scope.unidad.opciones[otherColumn][otherIndex].selected = false;
                    $scope.unidad.opciones[otherColumn][otherIndex].match = false;
                    $scope.unidad.opciones[otherColumn][otherIndex].fallo = true; // Para ver la animación cuando se falla

                }

            } 

            if ($scope.correctOptions == $scope.unidad.opciones[column].length) {
                // Si las parejas correctas es igual a la mitad de la cantidad de opciones habilitar el botón de continuar
                console.log('Respuestas correctas')
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

            if (respuestasAcertadas === $scope.correctOptions) {
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
                templateUrl: 'modals/feedback/feedback.modal.html',
                scope: $scope,
                buttons: [{
                        text: $filter('translate')(textoBoton),
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

        $scope.exitUnit = function () {
            $scope.modal = {
                texto1: '¿Estás seguro de salir?',
                texto2: 'Si sales perderás los avances en esta lección.',
                estado: 'alert', // ok, alert, error
                audio: 'salir'
            };
            $ionicPopup.show({
                templateUrl: 'modals/simple/simple.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: $filter('translate')('Salir de la lección'),
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                            $state.go('nf.cap_module', {
                                capacitation: $stateParams.capacitation,
                                module: $stateParams.module
                            });
                        }
                    }, {
                        text: $filter('translate')('Continuar Lección'),
                        onTap: function (e) {
                        }
                    }]
            });
        };

        $scope.irASiguienteUnidad = function () {
            $scope.siguienteUnidad = parseInt($stateParams.unit) + 1;
            if ($scope.siguienteUnidad > $scope.unidad.totalUnidades) {
                var data = {
                    capacitacion: $stateParams.capacitation,
                    modulo: $stateParams.module,
                    leccion: $stateParams.lesson
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
                $state.go('cap_unit', {
                    capacitation: $stateParams.capacitation,
                    module: $stateParams.module,
                    lesson: $stateParams.lesson,
                    unit: $scope.siguienteUnidad
                });
            }
        };

        $scope.reiniciarUnidad = function () {
            for (var i in $scope.unidad.opciones) {
                $scope.unidad.opciones[i].selected = false;
                $scope.unidad.opciones[i].evaluacion = false;
                $scope.selectedOptions = 0;
            }
            $scope.estadoUnidad = 'espera';
            $scope.botonCalificar = false;
        };

        $scope.playAudio = function (audio) {
            console.log(audio);
            if($rootScope.reproduceAudios){
                MediaService.play(audio);
            }
        };

        $scope.getScrollPosition = function () {/*if ($ionicScrollDelegate.getScrollPosition().top > 50) {if (!$scope.scrolled) {$scope.$apply(function() {$scope.scrolled = true;});}} else {if ($scope.scrolled) {$scope.$apply(function() {$scope.scrolled = false;});}}*/
        };

        $scope.changeAudio = function(){
            MediaService.stopAll(function () {
                $rootScope.reproduceAudios = !$rootScope.reproduceAudios
            });
        }

        // Events

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeSuccess');
            if (toParams.unit === $scope.unidad.numeroUnidad || fromState.name === 'nf.cap_module') {
                console.log($scope.audios)
                MediaService.preloadSimple($scope.audios, function () {
                    if ($scope.audiosDescargados) {
                        $scope.playAudio('title');
                    }
                });
            }
        });

        $scope.$on('avanceSaved', function (event, id) {
            $ionicLoading.hide();
            $state.go('cap_unit_end', {
                capacitation: $stateParams.capacitation,
                module: $stateParams.module,
                lesson: $stateParams.lesson,
                unit: $scope.siguienteUnidad
            });
        });

        $scope.$on('avanceFaliedSave', function (event, id) {
            $ionicLoading.hide();
            $state.go('cap_unit_end', {
                capacitation: $stateParams.capacitation,
                module: $stateParams.module,
                lesson: $stateParams.lesson,
                unit: $scope.siguienteUnidad
            });
        });


        // Functions

        function prepareSimpleOptions(unit){
            console.log('prepareSimpleOptions')
            var options = []
            for (let i in unit.opciones) {
                // Preparamos audios de cada opción
                $scope.audios['option' + unit.opciones[i].id] = $scope.assetpath_audio + unit.opciones[i].audio.nombre;
                $scope.audios['feedback' + unit.opciones[i].id] = $scope.assetpath_audio + unit.opciones[i].feedback.audio.nombre;

                if (unit.opciones[i].correcta == 1) {
                    $scope.correctOptions++;
                }


                unit.opciones[i].selected = false;
                unit.opciones[i].evaluacion = false;
                options.push(unit.opciones[i]);
            }
            shuffle(options);
            return options;
        }

        function preparePairsOptions(unit){
            console.log('preparePairsOptions')
            let columnA = [];
            let columnB = []
            /* Recorre todo el objeto de las opciones para crear el arreglo*/
            for (let i in unit.opciones) {
                unit.opciones[i].selected = false;
                unit.opciones[i].evaluacion = false;
                unit.opciones[i].pareja = '';
                unit.opciones[i].match = false;
                $scope.audios['option' + unit.opciones[i].id] = $scope.assetpath_audio + unit.opciones[i].audio.nombre;
                if (unit.opciones[i].columna == 1) {
                    columnA.push(unit.opciones[i]);
                } else {
                    columnB.push(unit.opciones[i]);
                }
            }
            /* Se mezclan los arreglos */
            shuffle(columnA);
            shuffle(columnB);
            return { columnA, columnB }
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
            return function (a, b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            };
        }
    });
});