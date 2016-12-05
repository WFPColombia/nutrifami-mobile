/*global angular*/
nutrifamiMobile.controller('PreloadController', function($ionicPlatform, $http, $scope, $ionicLoading, $cordovaZip, $rootScope, $timeout, $q, $location, $cordovaFileTransfer) {
    'use strict';
    $ionicPlatform.ready(function() {

        var targetPath = '';
        var trustHosts = true;
        var options = {};
        var archivosFaltantes = [];
        var archivosDescargados = 0;
        var archivosError = 0;

        var versionUrl = "http://nutrifami.org/js/version.JSON";
        var versionTargetPath = $rootScope.TARGETPATH + "version.JSON";
        var versionTargetPathNew = $rootScope.TARGETPATH + "versionNew.JSON";
        var version = '';
        var versionNew = '';

        var capacitacionUrl = "http://nutrifami.org/js/capacitacion.JSON";
        var capacitacionTargetPath = $rootScope.TARGETPATH + "capacitacion.JSON";
        var trustHosts = true;

        var zipUrl = 'https://s3.amazonaws.com/nutrifami/training.zip';
        var zipTargetPath = $rootScope.TARGETPATH + "training.zip";

        $scope.targetPathCapacitacion = targetPath;
        $scope.trustHosts = trustHosts;
        $scope.response = "Preparando para descargar";
        $scope.totalArchivos = 0;
        $scope.archivosDescargados = 0;
        $scope.archivosError = 0;
        $scope.errores = [];


        //Comprobar si existe el archivo de version.JSON



        var cargarVersion = function(archivo, tipo, callback) {
            $scope.response = "Cargando última versión"
            callback = callback || function() {};
            // Intentamos cargar el archivo json 
            $http.get(archivo).then(function(response) {
                //Almacena la versión vieja

                console.log(tipo + " " + response.data.Capacitacion.ID)

                if (tipo == 'antiguo') {
                    version = response.data.Capacitacion.ID;
                    callback();
                } else {
                    versionNew = response.data.Capacitacion.ID;
                    callback();
                }


            }, function errorCallback(response) {
                //Si nu enceuntra el archivo guarda la version vacia
                version = '';
                callback();
            });
        }

        var descargaVersion = function() {
            $scope.response = "Descargando última versión"

            if (window.cordova) {
                $cordovaFileTransfer.download(versionUrl, versionTargetPathNew, options, trustHosts)
                    .then(function(result) {
                        // Success!
                        $scope.response = "version descargada";
                        cargarVersion(versionTargetPathNew, 'nuevo', function() {
                            comprobarVersion();
                        });
                    }, function(err) {
                        $scope.response = err;
                    }, function(progress) {
                        $timeout(function() {
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                        });
                    });
            } else {
                cargarVersion('js/version-2.JSON', 'nuevo', function() {
                    comprobarVersion();
                });
            }
        }

        var comprobarVersion = function() {
            //Verifica si las versions son iguales
            console.log(version + " " + versionNew);
            if (version == versionNew) {
                console.log("Las versiones son iguales, no se descarga nada")
                limpiarArchivosVersiones();
                cargarCapacitacion(capacitacionTargetPath, function() {
                    $location.path('/login');
                });


            } else {
                console.log("Las versiones son diferentes, Descargar capacitacion");
                limpiarArchivosVersiones();
                comprobarZip(function() {
                    descargarCapacitacion();
                });
            }
        }


        var limpiarArchivosVersiones = function() {
            if (window.cordova) {
                $cordovaFileTransfer.download(versionTargetPathNew, versionTargetPath, options, trustHosts)
                    .then(function(result) {
                        console.log("Copiado");
                    }, function(err) {
                        console.log(err);
                    }, function(progress) {

                    });
                window.resolveLocalFileSystemURL($rootScope.TARGETPATH, function(dir) {

                    dir.getFile("versionNew.JSON", { create: false }, function(fileEntry) {
                        fileEntry.remove(function(file) {
                            console.log("versionNew.JSON Archivo borrado");
                        }, function() {
                            console.log("error al borrar " + error.code);
                        }, function() {
                            console.log("archivo no existe versionNew.JSON");
                        });
                    });
                });
            }
        }

        var comprobarZip = function(callback) {

            $scope.response = "Descargando archivos de capacitación";


            if (window.cordova) {
                $http.get(zipTargetPath + ".txt").then(function(response) {
                    callback();
                }, function errorCallback(response) {
                    console.log("No encontro el arvho txt");
                    $cordovaFileTransfer.download(zipUrl, zipTargetPath, options, trustHosts)
                        .then(function(entry) {
                                // Despues de descargado se descormprime!
                                $scope.response = "Descomprimiendo archivos de capacitación";
                                console.log("download complete: " + entry.toURL());

                                $cordovaZip
                                    .unzip(
                                        zipTargetPath, // https://github.com/MobileChromeApps/zip/blob/master/tests/tests.js#L32
                                        $rootScope.TARGETPATH // https://github.com/MobileChromeApps/zip/blob/master/tests/tests.js#L45
                                    ).then(function() {
                                        console.log('success');

                                        $cordovaFileTransfer.download(versionTargetPath, zipTargetPath + ".txt", options, trustHosts)
                                            .then(function(result) {
                                                console.log("Copiado");
                                                window.resolveLocalFileSystemURL($rootScope.TARGETPATH, function(dir) {

                                                    dir.getFile("training.zip", { create: false }, function(fileEntry) {
                                                        fileEntry.remove(function(file) {
                                                            callback();
                                                            console.log("training.zip Archivo borrado");
                                                        }, function() {
                                                            console.log("error al borrar " + error.code);
                                                            callback();
                                                        }, function() {
                                                            console.log("archivo no existe versionNew.JSON");
                                                        });
                                                    });
                                                });


                                            }, function(err) {
                                                console.log("Al crear el archivo zip.txt")
                                                callback();
                                                console.log(err);
                                            }, function(progress) {
                                                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                            });

                                    }, function() {
                                        console.log("Error al descompromir el zip")
                                        callback();
                                    }, function(progress) {
                                        // https://github.com/MobileChromeApps/zip#usage
                                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    });


                            },
                            function(err) {
                                console.log("Error al descargar el zip");

                                callback();
                            },
                            function(progress) {
                                $timeout(function() {
                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                });
                            });
                });

            } else {
                callback();
            }

        }




        //Descargamos el archivo json de capacitaciones
        var descargarCapacitacion = function() {
            $scope.response = "Descargando archivos faltantes";
            if (window.cordova) {
                $cordovaFileTransfer.download(capacitacionUrl, capacitacionTargetPath, options, trustHosts)
                    .then(function(result) {
                        // Success!
                        $scope.response = "capacitación cargada";
                        cargarCapacitacion(capacitacionTargetPath, function() {
                            predescargaAssets();
                        });
                    }, function(err) {
                        $scope.response = err;
                    }, function(progress) {
                        $timeout(function() {
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                        });
                    });
            } else {
                cargarCapacitacion("js/capacitacion.JSON", function() {
                    console.log("ir al login");
                    $location.path('/login');
                });
            }

        }



        function cargarCapacitacion(archivo, callback) {
            $scope.response = "Descargando capacitación"

            callback = callback || function() {};
            // Intentamos cargar el archivo json 
            $http.get(archivo).then(function(response) {
                $scope.myData = response.data;
                nutrifami.training.initClient(response.data, function() {
                    callback();
                });
            }, function errorCallback(response) {
                $scope.response = response.statusText;
                callback();
            });
        }

        if (window.cordova) {
            cargarVersion(versionTargetPath, 'antiguo', function() {
                descargaVersion();
            });
        } else {

            cargarVersion("js/version.JSON", 'antiguo', function() {
                descargaVersion();
            });

        }

        function predescargaAssets() {

            //Definimos varios lotes de descarga para que no se bloquee la app
            var recursos = [];

            /* Preparar modulos*/
            var serv_modulos = $scope.myData.serv_modulos;
            var assets = ['titulo', 'descripcion', 'imagen', 'imagen2'];
            var asset = '';
            for (var i in serv_modulos) {
                for (var j in assets) {
                    if (j < 2) { //Descargamos titulos y descripcion
                        if (serv_modulos[i][assets[j]].audio.nombre) {
                            asset = serv_modulos[i][assets[j]].audio;
                            recursos.push(asset);
                        }
                    } else { // Descargamos imagen y imagen2
                        if (serv_modulos[i][assets[j]].nombre) {
                            asset = serv_modulos[i][assets[j]];
                            recursos.push(asset);
                        }
                    }
                }
            }

            /* Preparar lecciones */
            var serv_lecciones = $scope.myData.serv_lecciones;
            assets = ['titulo', 'finalizado', 'imagen'];
            for (var i in serv_lecciones) {
                for (var j in assets) {
                    if (j < 2) {
                        if (serv_lecciones[i][assets[j]].audio.nombre) {
                            asset = serv_lecciones[i][assets[j]].audio;
                            recursos.push(asset);

                        }
                    } else {
                        if (serv_lecciones[i][assets[j]].nombre) {
                            asset = serv_lecciones[i][assets[j]];
                            recursos.push(asset);

                        }
                    }
                }
            }




            /* Preparar unidades */
            var serv_unidades = $scope.myData.serv_unidades;
            assets = ['titulo', 'instruccion', 'imagen', 'audio'];
            var assets_opciones = ['feedback', 'audio', 'media'];
            var asset1 = '';
            var asset2 = '';
            for (var i in serv_unidades) {
                for (var j in assets) {
                    if (j < 2) {
                        if (serv_unidades[i][assets[j]] && serv_unidades[i][assets[j]].audio.nombre) {
                            asset1 = serv_unidades[i][assets[j]].audio;
                            recursos.push(asset1);

                        }
                    } else {
                        if (serv_unidades[i][assets[j]] && serv_unidades[i][assets[j]].nombre) {
                            asset2 = serv_unidades[i][assets[j]];
                            recursos.push(asset2);
                        }
                    }
                }
                /*Prepara las opciones de cada unidad*/
                for (var k in serv_unidades[i].opciones) {
                    for (var l in assets_opciones) {
                        if (l < 1) {
                            if (serv_unidades[i].opciones[k][assets_opciones[l]] && serv_unidades[i].opciones[k][assets_opciones[l]].audio.nombre) {
                                var asset = serv_unidades[i].opciones[k][assets_opciones[l]].audio;

                                recursos.push(asset);

                            }
                        } else {
                            if (serv_unidades[i].opciones[k][assets_opciones[l]] && serv_unidades[i].opciones[k][assets_opciones[l]].nombre) {
                                var asset = serv_unidades[i].opciones[k][assets_opciones[l]];

                                recursos.push(asset);

                            }
                        }


                    }
                }
            }


            comprobarArchivosExistentes(recursos).then(function(response) {
                archivosFaltantes = response;
                $scope.totalArchivos = archivosFaltantes.length;
                descargarArchivo(0);
                /*descargarArchivosFaltantes(response).then(function (msg) {
                 console.log('Lote 01 descargado');
                 
                 
                 });*/
            });
        }

        function comprobarArchivosExistentes(recursos) {

            var deferred = $q.defer();

            var archivosExistentes = 0;

            var promises = [];

            recursos.forEach(function(i, x) {
                promises.push($http.get($rootScope.TARGETPATH + i.nombre).then(function(response) {
                    archivosExistentes++;
                    recursos[x].loaded = true;
                }, function errorCallback(response) {
                    if (typeof recursos[x] !== 'undefined' || recursos[x] !== '') {
                        recursos[x].loaded = false;
                    }
                }));
            });

            $q.all(promises).then(function(res) {
                $scope.archivosExistentes = archivosExistentes;
                deferred.resolve(recursos);
            });
            return deferred.promise;

        }

        /*function descargarArchivo(recursos) {
         
         var deferred = $q.defer();
         $scope.totalArchivos = recursos.length;
         var archivosDescargados = 0;
         var archivosError = 0;
         var promises = [];
         
         recursos.forEach(function (i, x) {
         test3++;
         var url = i.url;
         var targetPath = $rootScope.TARGETPATH + i.nombre;
         
         if (window.cordova) {
         if (!i.loaded) {
         promises.push($cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
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
         }*/

        function descargarArchivo(id) {
            if (archivosFaltantes[id]) {
                //console.log(!archivosFaltantes[id].loaded);
                if (window.cordova) {
                    if (!archivosFaltantes[id].loaded) {
                        var url = encodeURI(archivosFaltantes[id].url);
                        var targetPath = $rootScope.TARGETPATH + archivosFaltantes[id].nombre;
                        console.log(targetPath);
                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                            .then(function(entry) {
                                // Success!
                                //console.log("download complete: " + entry.toURL());
                                //$scope.response = "Descarga archivo completada";
                                archivosDescargados++;
                                $scope.archivosDescargados = archivosDescargados;
                                descargarArchivo(id + 1);
                            }, function(error) {
                                //console.log(error);
                                $scope.response = error.http_status;
                                $scope.errores.push(error);
                                archivosError++;
                                $scope.archivosError = archivosError;
                                descargarArchivo(id + 1);
                            }, function(progress) {
                                $timeout(function() {
                                    $scope.url = url;
                                    $scope.targetPath = targetPath;
                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                });
                            });
                    } else {
                        descargarArchivo(id + 1);
                    }
                }
            } else {
                $ionicLoading.hide();
                console.log($scope.errores);
                $location.path('/login');
            }
        }
    });
});
