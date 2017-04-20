/*global angular*/
nutrifamiMobile.controller('PreloadController', function($ionicPlatform, $ionicLoading, $ionicPopup, $http, $scope, $cordovaZip, $rootScope, $timeout, $q, $location, $cordovaFileTransfer, $cordovaNetwork, UsuarioService) {
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

        var zipUrl = 'https://s3.amazonaws.com/nutrifami/test.zip';
        var zipTargetPath = $rootScope.TARGETPATH + "training.zip";

        $scope.targetPathCapacitacion = targetPath;
        $scope.trustHosts = trustHosts;
        $scope.response = "Estamos preparando Nutrifami. Por favor espera un momento";
        $scope.totalArchivos = 0;
        $scope.archivosDescargados = 0;
        $scope.archivosError = 0;
        $scope.errores = [];

        //Verificar el destino

        var destino = "/login";
        var acceso = false;

        if (UsuarioService.getUsuarioActivo() != null) {
            acceso = true;
            destino = '/app/capacitacion';
        }


        //Comprobamos la conexión a Internet   
        if (window.cordova) {
            //var isOnline = $cordovaNetwork.isOnline();
            var isOffline = $cordovaNetwork.isOffline()
            if (isOffline) {
                if (!acceso) {
                    $ionicPopup.alert({
                            title: "Sin conexión a Internet",
                            content: "Actualmente tu equipo no tiene conexión a Internet. Para poder usar Nutrifami en modo Offline debe al menos ingresar una vez con conexión a Internet ",
                            buttons: [
                                { text: 'Salir' }
                            ]
                        })
                        .then(function(res) {
                            ionic.Platform.exitApp();
                        });

                } else {
                    $ionicPopup.alert({
                            title: "Sin conexión a Internet",
                            content: "Actualmente su dispositivo se encuentra desconectado de Internet. Usted podrá usar Nutrifami, pero el avance no será guardado.",
                            buttons: [
                                { text: 'Continuar' }
                            ]
                        })
                        .then(function(res) {
                            $location.path('/app/capacitacion');
                        });

                }
            }

        }


        //Comprobar si existe el archivo de version.JSON
        var leerVersion = function(archivo, tipo, callback) {
            $scope.response = "Verificando la versión de la capacitación";
            callback = callback || function() {};
            // Intentamos cargar el archivo version.json
            console.log("Leyendo version " + tipo);
            $http.get(archivo).then(function(response) {
                if (tipo == 'antiguo') { //Almacena la versión del archivo que ya existía
                    version = response.data.Capacitacion.ID;
                    console.log("La version móvil es: " + version);
                    callback();
                } else { //Almacena la versión del archivo recien descargado
                    versionNew = response.data.Capacitacion.ID;
                    callback();
                }
            }, function errorCallback(response) {
                //Si el archivo version.JSON no existe se deja la versión vacia
                version = '';
                callback();
            });
        }

        var descargaVersion = function() { //Descarga el último archivo de verificación
            $scope.response = "Verificacion la última versión disponible de la capacitación"
            if (window.cordova) {
                $cordovaFileTransfer.download(versionUrl, versionTargetPathNew, options, trustHosts)
                    .then(function(result) {
                        // Success!
                        $scope.response = "Archivo de versión descargada";
                        leerVersion(versionTargetPathNew, 'nuevo', function() { //Carga el archivo descargado para almacenar la versión
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
                leerVersion('js/version-2.JSON', 'nuevo', function() {
                    comprobarVersion();
                });
            }
        }

        var comprobarVersion = function() {
            //Verifica si las versions son iguales
            console.log("Comprobando versiones:");
            console.log("Versión antigua: " + version);
            console.log("Versión nueva: " + versionNew);
            if (version == versionNew) { //Si las versiones son iguales de comprobar que exista el archivo txt.zip
                //El archivo txt.zip ........
                console.log("Las versiones son iguales, comprobando archivo (training.ok).");
                limpiarArchivosVersiones();

                $http.get(zipTargetPath + ".ok").then(function(response) { //Intenta cargar el archivo zip.ok, si existe este archivo
                    // quiere decir que la descarga ya se hizo con éxito anteriormente entonces salta este proceso
                    console.log("Archivo training.ok existe");
                    console.log("Descarga y descompresion de training.zip se había hecho con éxito anteriormente");
                    console.log("Leyendo archivo con información de capacitación");
                    cargarCapacitacion(capacitacionTargetPath, function() {
                        console.log("Archivo de capacitación leido con éxito");
                        $location.path(destino);

                    });
                }, function errorCallback(response) {

                    //Si arroja error es que la descarga no se había hecho bien y toca comprobar zip nuevamente
                    console.log("Archivo training.ok NO existe");
                    comprobarZip(function() {
                        descargarCapacitacion();
                    });

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
                        console.log("Actualizando archivo de versión");
                    }, function(err) {
                        console.log(err);
                    }, function(progress) {

                    });
                window.resolveLocalFileSystemURL($rootScope.TARGETPATH, function(dir) {
                    dir.getFile("versionNew.JSON", { create: false }, function(fileEntry) {
                        fileEntry.remove(function(file) {
                            console.log("Archuvo versionNew.JSON eliminado con éxito");
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
                console.log('Verificando que training.zip.descargado existe')
                $http.get(zipTargetPath + ".descargado").then(function(response) {
                    console.log('Archivo training.zip.descargado existe, saltando a la descarga de asstess individual')

                    callback();
                }, function errorCallback(response) {
                    //Si no encuentra el archivo .zip.txt quiere decir que no ha descomprimido el .zip
                    console.log('Archivo trainign.zip.descargado NO existe');
                    console.log('Descargando archivo training.zip nuevamente');
                    $cordovaFileTransfer.download(zipUrl, zipTargetPath, options, trustHosts)
                        .then(function(entry) {
                                //Primero lo descarga y lo intenta descomprimir
                                console.log("Archivo training.zip descargado con éxito")
                                console.log("Descomprimiendo archivo training.zip")
                                $scope.response = "Descomprimiendo archivos de capacitación";
                                $cordovaZip
                                    .unzip(
                                        zipTargetPath,
                                        $rootScope.TARGETPATH
                                    ).then(function() {
                                        //Cuando termina de descomprimir el archivo crear el archivo zip.txt para que no vuelva a descomprimir en futuras ocasines
                                        console.log("Archivo training.zip descomprimido con éxito");
                                        console.log("Creando archivo de verificación training.zip.descargado");
                                        $cordovaFileTransfer.download(versionTargetPath, zipTargetPath + ".descargado", options, trustHosts)
                                            .then(function(result) {
                                                console.log("Archivo training.zip.descargado creado con éxito");
                                                console.log("Borrando archivo training.zip");
                                                window.resolveLocalFileSystemURL($rootScope.TARGETPATH, function(dir) { //Ahora elimina el archivo .zip para que no ocupe espacio

                                                    dir.getFile("training.zip", { create: false }, function(fileEntry) {
                                                        fileEntry.remove(function(file) {
                                                            callback();
                                                            console.log("Archivo training.zip borrado con éxito");
                                                        }, function() {
                                                            console.log("Error al borrar archivo training.zip" + error.code);
                                                            callback();
                                                        }, function() {
                                                            console.log("Error: Archivo training.zip no existe");
                                                            callback();
                                                        });
                                                    });
                                                });


                                            }, function(err) {
                                                console.log("Error: No se pudo crear el archivo training.zip.descargado")
                                                callback();
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
            if (window.cordova) { //VVersión Móvil
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
            } else { //En la versión web
                cargarCapacitacion("js/capacitacion.JSON", function() {

                    $location.path(destino);
                });
            }

        }



        function cargarCapacitacion(archivo, callback) {
            $scope.response = "Descargando capacitación"
            console.log("Descargando capacitación");

            callback = callback || function() {};
            // Intentamos cargar el archivo json 
            $http.get(archivo).then(function(response) {
                console.log("Capacitación descargada con exito");
                $scope.myData = response.data;
                nutrifami.training.initClient(response.data, function() {
                    callback();
                });
            }, function errorCallback(response) {
                console.log("Error descargando capacitación");
                $scope.response = response.statusText;
                console.log(JSON.stringify(response));
                callback();
            });
        }

        //INICIA ACÁ
        if (window.cordova) { //Si estamos en el móvil cargamos el archivo del dispositivo.
            console.log("Versión móvil");
            leerVersion(versionTargetPath, 'antiguo', function() {
                descargaVersion();
            });
        } else { //Si estamos en el navegador buscamos el archivo version.JSON que tenemos en la carpeta js
            console.log("Versión web");
            leerVersion("js/version.JSON", 'antiguo', function() {
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
                console.log($scope.errores);
                //Creamos un archivo para verificar que todo quedo bien descargado
                $cordovaFileTransfer.download(versionTargetPath, zipTargetPath + ".ok", options, trustHosts)
                    .then(function(result) {
                        console.log("archivo zip.ok creado con éxito");
                    }, function(err) {
                        console.log("Error: No se pudo crear el archivo zip.ok")
                        callback();
                    }, function(progress) {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    });
                $location.path(destino);
            }
        }
    });
});
