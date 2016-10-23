/*global angular*/
nutrifamiMobile.controller('PreloadController', function ($ionicPlatform, $http, $scope, $ionicLoading, $rootScope, $timeout, $q, $location, $cordovaFileTransfer) {
    'use strict';
    $ionicPlatform.ready(function () {


        // Abrimos el overlay de mientras se descargan los archivos
        $scope.loading = $ionicLoading.show({
            template: 'Descargando archivos',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });

        var targetPath = '';
        var url = "http://nutrifami.org/js/capacitacion.JSON";
        var trustHosts = true;
        var options = {};

        $scope.url = url;
        $scope.targetPath = targetPath;
        $scope.trustHosts = trustHosts;
        $scope.response = "";
        $scope.totalArchivos = 0;
        $scope.archivosDescargados = 0;
        $scope.archivosError = 0;
        $scope.errores = [];

        //Descargamos el archivo json de capacitaciones
        if (window.cordova) {
            targetPath = cordova.file.applicationStorageDirectory + "capacitacion.JSON";
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                    .then(function (result) {
                        // Success!
                        $scope.response = "capacitación cargada con éxito!! :)";
                        cargarCapacitacion(targetPath, function () {
                            predescargaAssets();
                        });
                    }, function (err) {
                        $scope.response = err;
                    }, function (progress) {
                        $timeout(function () {
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                        });
                    });
        } else {
            targetPath = "js/capacitacion.JSON";
            cargarCapacitacion(targetPath, function () {
                predescargaAssets();
            });
        }


        function cargarCapacitacion(archivo, callback) {
            callback = callback || function () {
            };
            
            // Intentamos cargar el archivo json 
            $http.get(archivo).then(function (response) {
                $scope.myData = response.data;
                nutrifami.training.initClient(response.data, function(){
                    callback();
                });
                

            }, function errorCallback(response) {
                $scope.response = response.statusText;
                callback();
            });
        }

        function predescargaAssets() {

            //Definimos varios lotes de descarga para que no se bloquee la app
            var modulos = [];
            var recursos2 = [];
            var recursos3 = [];
            var recursos4 = [];
            var opciones1 = [];
            var opciones2 = [];
            var opciones3 = [];
            var opciones4 = [];
            var opciones5 = [];
            var opciones6 = [];
            var opciones7 = [];

            /* Preparar modulos*/
            var serv_modulos = $scope.myData.serv_modulos;
            var assets = ['titulo', 'descripcion', 'imagen', 'imagen2'];
            var asset = '';
            for (var i in serv_modulos) {
                for (var j in assets) {
                    if (j < 2) { //Descargamos titulos y descripcion
                        if (serv_modulos[i][assets[j]].audio.nombre != "") {
                            asset = serv_modulos[i][assets[j]].audio;
                        }
                    } else { // Descargamos imagen y imagen2
                        if (serv_modulos[i][assets[j]].nombre != "") {
                            asset = serv_modulos[i][assets[j]];
                        }
                    }
                    modulos.push(asset);
                }
            }

            /* Preparar lecciones */
            var serv_lecciones = $scope.myData.serv_lecciones;
            assets = ['titulo', 'finalizado', 'imagen'];
            for (var i in serv_lecciones) {
                for (var j in assets) {
                    if (j < 2) {
                        if (serv_lecciones[i][assets[j]].audio.nombre != "") {
                            asset = serv_lecciones[i][assets[j]].audio;
                        }
                    } else {
                        if (serv_lecciones[i][assets[j]].nombre != "") {
                            asset = serv_lecciones[i][assets[j]];
                        }
                    }
                    recursos2.push(asset);
                }
            }


            /* Preparar unidades */
            var serv_unidades = $scope.myData.serv_unidades;
            assets = ['titulo', 'instruccion', 'imagen', 'audio'];
            var assets_opciones = ['feedback', 'audio'];
            var asset1 = '';
            var asset2 = '';
            for (var i in serv_unidades) {
                for (var j in assets) {
                    if (j < 2) {
                        if (typeof serv_unidades[i][assets[j]] !== 'undefined' && serv_unidades[i][assets[j]].audio.nombre != "") {
                            asset1 = serv_unidades[i][assets[j]].audio;
                            recursos3.push(asset1);

                        }
                    } else {
                        if (typeof serv_unidades[i][assets[j]] !== 'undefined' && serv_unidades[i][assets[j]].nombre != "") {
                            asset2 = serv_unidades[i][assets[j]];
                            recursos4.push(asset2);
                        }
                    }




                }
                /*Prepara las opciones de cada unidad*/
                for (var k in serv_unidades[i].opciones) {
                    for (var l in assets_opciones) {
                        if (l < 1) {
                            if (typeof serv_unidades[i].opciones[k][assets_opciones[l]] !== 'undefined' && serv_unidades[i].opciones[k][assets_opciones[l]].audio.nombre != "") {
                                var asset = serv_unidades[i].opciones[k][assets_opciones[l]].audio;
                            }
                        } else {
                            if (typeof serv_unidades[i].opciones[k][assets_opciones[l]] !== 'undefined' && serv_unidades[i].opciones[k][assets_opciones[l]].nombre != "") {
                                var asset = serv_unidades[i].opciones[k][assets_opciones[l]];
                            }
                        }

                        if (k < 50) {
                            opciones1.push(asset);
                        } else if (k < 100) {
                            opciones2.push(asset);
                        } else if (k < 150) {
                            opciones3.push(asset);
                        } else if (k < 200) {
                            opciones4.push(asset);
                        } else if (k < 250) {
                            opciones5.push(asset);
                        } else if (k < 300) {
                            opciones6.push(asset);
                        } else if (k < 350) {
                            opciones7.push(asset);
                        }
                    }
                }
            }
            comprobarArchivosExistentes(modulos).then(function (response) {
                descargarArchivosFaltantes(response).then(function (msg) {
                    console.log('Lote 01 descargado');

                    comprobarArchivosExistentes(recursos2).then(function (response) {
                        descargarArchivosFaltantes(response).then(function (msg) {
                            console.log('Lote 02 descargado');

                            comprobarArchivosExistentes(recursos3).then(function (response) {
                                descargarArchivosFaltantes(response).then(function (msg) {
                                    console.log('Lote 03 descargado');

                                    comprobarArchivosExistentes(recursos4).then(function (response) {
                                        descargarArchivosFaltantes(response).then(function (msg) {
                                            console.log('Lote 03 descargado');

                                            comprobarArchivosExistentes(opciones1).then(function (response) {
                                                descargarArchivosFaltantes(response).then(function (msg) {
                                                    console.log('Lote 2 descargado');

                                                    comprobarArchivosExistentes(opciones2).then(function (response) {
                                                        descargarArchivosFaltantes(response).then(function (msg) {
                                                            console.log('Lote 3 descargado');

                                                            comprobarArchivosExistentes(opciones3).then(function (response) {
                                                                descargarArchivosFaltantes(response).then(function (msg) {
                                                                    console.log('Lote 4 descargado');

                                                                    comprobarArchivosExistentes(opciones4).then(function (response) {
                                                                        descargarArchivosFaltantes(response).then(function (msg) {
                                                                            console.log('Lote 5 descargado');

                                                                            comprobarArchivosExistentes(opciones5).then(function (response) {
                                                                                descargarArchivosFaltantes(response).then(function (msg) {
                                                                                    console.log('Lote 6 descargado');

                                                                                    comprobarArchivosExistentes(opciones6).then(function (response) {
                                                                                        descargarArchivosFaltantes(response).then(function (msg) {
                                                                                            console.log('Lote 7 descargado');

                                                                                            comprobarArchivosExistentes(opciones7).then(function (response) {
                                                                                                descargarArchivosFaltantes(response).then(function (msg) {
                                                                                                    $ionicLoading.hide();
                                                                                                    console.log('Lote 8 descargado');
                                                                                                    console.log($scope.errores);
                                                                                                    console.log("Descarga finalizada");
                                                                                                    $location.path('/login');

                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }

        function comprobarArchivosExistentes(recursos) {
            var deferred = $q.defer();

            var archivosExistentes = 0;

            var promises = [];


            recursos.forEach(function (i, x) {
                //console.log($rootScope.TARGETPATH + i.nombre);
                promises.push($http.get($rootScope.TARGETPATH + i.nombre).then(function (response) {
                    //onsole.log("Archivo existe: " + x);
                    archivosExistentes++;
                    recursos[x].loaded = true;

                }, function errorCallback(response) {
                    //console.log("Archivo NO existe: " + x);
                    if (typeof recursos[x] !== 'undefined' || recursos[x] !== '') {
                        recursos[x].loaded = false;
                    }

                }));

            });

            $q.all(promises).then(function (res) {
                $scope.archivosExistentes = archivosExistentes;
                deferred.resolve(recursos);
            });
            return deferred.promise;

        }

        function descargarArchivosFaltantes(recursos) {

            var deferred = $q.defer();
            $scope.totalArchivos = recursos.length;
            var archivosDescargados = 0;
            var archivosError = 0;
            var promises = [];

            recursos.forEach(function (i, x) {
                var url = i.url;
                var targetPath = $rootScope.TARGETPATH + i.nombre;

                if (window.cordova) {
                    if (!i.loaded) {
                        promises.push($cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                            console.log("Descarga archivo: " + targetPath);
                            $scope.response = "Descarga archivo completada";
                            archivosDescargados++;
                            $scope.archivosDescargados = archivosDescargados;
                        }, function (err) {
                            $scope.response = err.http_status;
                            $scope.errores.push(err);
                            archivosError++;
                            $scope.archivosError = archivosError;
                        }, function (progress) {
                            $timeout(function () {
                                $scope.url = url;
                                $scope.targetPath = targetPath;
                                $scope.response = "Descargando Archivo";
                                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                            });
                        }));
                    }
                }
            });

            $q.all(promises).then(function (res) {
                deferred.resolve("Archivos descargados");
            });

            return deferred.promise;
        }
    });
});
