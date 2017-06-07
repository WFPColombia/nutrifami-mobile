/*global angular*/
nutrifamiMobile.controller('PreloadController', function($ionicPlatform, $ionicLoading, $ionicPopup, $http, $scope, $cordovaZip, $rootScope, $timeout, $q, $location, $cordovaFile, $cordovaFileTransfer, $cordovaNetwork, UsuarioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        var trustHosts = true;
        var options = {};
        var archivosFaltantes = [];
        var archivosDescargados = 0;
        var archivosError = 0;
        $scope.response = "Estamos preparando Nutrifami. Por favor espera un momento";
        $scope.totalArchivos = 0;
        $scope.archivosDescargados = 0;
        $scope.archivosError = 0;
        $scope.errores = [];

        // CHECK
        $cordovaFile.createDir(cordova.file.dataDirectory, "new_dir", false)
            .then(function(success) {
                console.log(success);
            }, function(error) {
                console.log(error)
            });



        var version = {
            'alias': 'version',
            'nombre': 'version.JSON',
            'movil': '',
            'web': '',
            'url': 'http://nutrifami.org/js/version.JSON',
            'path': encodeURI($rootScope.TARGETPATH + "version.JSON"),
            'descargado': false,
        };

        console.log(version);

        var capacitacionInfo = {
            'alias': 'capacitacion',
            'nombre': 'capacitacion.JSON',
            'url': 'http://nutrifami.org/js/capacitacion.JSON',
            'path': encodeURI($rootScope.TARGETPATH + "capacitacion.JSON"),
            'descargado': false,
        };

        var assetsInfo = {
            'alias': 'training',
            'nombre': 'training.zip',
            'url': 'https://s3.amazonaws.com/nutrifami/training.zip',
            'path': encodeURI($rootScope.TARGETPATH + "training.zip"),
            'descargado': false,
            'descomprimido': false
        };


        if (localStorage.getItem('version') == null) {
            localStorage.setItem("version", JSON.stringify(version));
            localStorage.setItem("assetsInfo", JSON.stringify(assetsInfo));
        } else {
            version = JSON.parse(localStorage.getItem('version'));
            assetsInfo = JSON.parse(localStorage.getItem('assetsInfo'));
        }

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

        var descargarArchivo = function(objeto, callback) {
            callback = callback || function() {};
            $cordovaFileTransfer.download(objeto.url, objeto.path, options, trustHosts).then(function(result) {
                console.log(objeto.nombre + " descargado con éxito");
                console.log(result.nativeURL);
                callback(true);
            }, function(err) {
                console.log("Error al descargar " + objeto.nombre);
                console.log(err);
                console.log(err.body);
                $scope.errorDescarga();
                callback(false);
            }, function(progress) {
                $timeout(function() {
                    console.log("Descargando archivo " + objeto.nombre);
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                });
            });
        }


        var leerArchivo = function(objeto, callback) {
            var obj = objeto;
            callback = callback || function() {};
            console.log("Leer archivo " + $rootScope.TARGETPATH);
            $cordovaFile.readAsText($rootScope.TARGETPATH, objeto.nombre)
                .then(function(response) {
                    obj.data = JSON.parse(response);
                    console.log(objeto.nombre + " leido con éxito");
                    console.log(response);
                    callback(obj);
                }, function(error) {
                    console.log("Error al leer " + objeto.nombre);
                    console.log(error);
                    callback({});
                });

        };

        var descomprimirArchivo = function(objeto, callback) {
            callback = callback || function() {};
            $cordovaZip.unzip(objeto.path, $rootScope.TARGETPATH).then(function() {
                console.log(objeto.nombre + " descomprimido con éxito.");

                $cordovaFile.removeFile($rootScope.TARGETPATH, objeto.nombre)
                    .then(function(success) {
                        console.log("Archivo " + objeto.nombre + " eliminado con éxito");
                        callback();
                    }, function(error) {
                        console.log(error);
                    });

            }, function() {
                console.log("Error al descomprimir " + objeto.nombre)
                callback();
            }, function(progress) {
                console.log("Descomprimiendo " + objeto.nombre)
                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            });
        };

        var descargarLeerCapacitacion = function() {
            descargarArchivo(capacitacionInfo, function(response) {
                capacitacionInfo.descargado = response;
                leerArchivo(capacitacionInfo, function(obj) {
                    console.log(obj);
                    $scope.myData = obj.data;
                    nutrifami.training.initClient(obj.data, function() {
                        predescargaAssets()
                    });
                });
            });
        }

        var comprobarVersion = function() {
            console.log("Comprobar Versión.");
            if (version.movil == version.web) {
                version.movil = version.web;
                version.web = '';

                if (assetsInfo.descomprimido) {
                    $location.path(destino);

                } else if (assetsInfo.descargado) {
                    $scope.response = "Descomprimiendo archivos de capacitación";
                    descomprimirArchivo(assetsInfo, function() {
                        assetsInfo.descomprimido = true;
                        localStorage.setItem("assetsInfo", JSON.stringify(assetsInfo));
                        $location.path(destino);
                    });
                } else {
                    $scope.response = "Descargando archivos de capacitación";
                    descargarArchivo(assetsInfo, function(response) {
                        assetsInfo.descargado = response;
                        localStorage.setItem("assetsInfo", JSON.stringify(assetsInfo));
                        descomprimirArchivo(assetsInfo, function() {
                            assetsInfo.descomprimido = true;
                            localStorage.setItem("assetsInfo", JSON.stringify(assetsInfo));
                            $location.path(destino)
                        });
                    });
                }
            } else {
                console.log("Las versiones son diferentes, Descargar capacitación");
                version.movil = version.web;
                version.web = '';
                $scope.response = "Hay una actualización disponible. Descargando la última versión";
                if (assetsInfo.descargado) {
                    if (assetsInfo.descomprimido) {
                        descargarLeerCapacitacion();
                    } else {
                        $scope.response = "Descomprimiendo archivos de capacitación";
                        descomprimirArchivo(assetsInfo, function() {
                            assetsInfo.descomprimido = true;
                            localStorage.setItem("assetsInfo", JSON.stringify(assetsInfo));
                            descargarLeerCapacitacion();
                        });
                    }
                } else {
                    descargarArchivo(assetsInfo, function(response) {
                        assetsInfo.descargado = response;
                        localStorage.setItem("assetsInfo", JSON.stringify(assetsInfo));
                        $scope.response = "Descomprimiendo archivos de capacitación";
                        descomprimirArchivo(assetsInfo, function() {
                            assetsInfo.descomprimido = true;
                            localStorage.setItem("assetsInfo", JSON.stringify(assetsInfo));
                            descargarLeerCapacitacion();
                        });
                    });
                }
            }
        }


        function predescargaAssets() {
            //Definimos varios lotes de descarga para que no se bloquee la app
            $scope.response = "Ya falta poco, estamos descargando los últimos archivos faltantes.";
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

            console.log(recursos);

            comprobarArchivosExistentes(recursos).then(function(response) {
                archivosFaltantes = response;
                $scope.totalArchivos = archivosFaltantes.length;
                descargarAsset(0);
            });
        }

        function comprobarArchivosExistentes(recursos) {

            var deferred = $q.defer();
            var archivosExistentes = 0;
            var promises = [];

            recursos.forEach(function(i, x) {
                /*promises.push($http.get($rootScope.TARGETPATH + i.nombre).then(function(response) {
                    archivosExistentes++;
                    recursos[x].loaded = true;
                }, function errorCallback(response) {
                    if (typeof recursos[x] !== 'undefined' || recursos[x] !== '') {
                        recursos[x].loaded = false;
                    }
                }));*/

                promises.push($cordovaFile.checkFile($rootScope.TARGETPATH, i.nombre)
                    .then(function(success) {
                        archivosExistentes++;
                        recursos[x].loaded = true;
                    }, function(error) {
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

        function descargarAsset(id) {
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
                                console.log("Descarga completa: " + archivosFaltantes[id].nombre);
                                //$scope.response = "Descarga archivo completada";
                                archivosDescargados++;
                                $scope.archivosDescargados = archivosDescargados;
                                descargarAsset(id + 1);
                            }, function(error) {
                                console.log("Error al descargar " + archivosFaltantes[id].nombre);
                                console.log(error);
                                $scope.response = error.http_status;
                                $scope.errores.push(error);
                                archivosError++;
                                $scope.archivosError = archivosError;
                                descargarAsset(id + 1);
                            }, function(progress) {
                                $timeout(function() {
                                    console.log("Descargando archivo " + archivosFaltantes[id].nombre);
                                    $scope.url = url;
                                    $scope.targetPath = targetPath;
                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                });
                            });
                    } else {
                        descargarAsset(id + 1);
                    }
                }
            } else {
                console.log($scope.errores);
                localStorage.setItem("version", JSON.stringify(version));
                $location.path(destino);
            }
        }

        // A confirm dialog
        $scope.errorDescarga = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Error en la desarga',
                template: 'Hubo un error en la descarga de archivos, verifique la conexión a Internet e inténtelo más tarde!',
                okText: 'Salir'
            });

            alertPopup.then(function(res) {
                ionic.Platform.exitApp();
            });
        };

        if (window.cordova) {
            console.log("Versión móvil");
            $scope.response = "Consultado la versión más reciente";
            descargarArchivo(version, function(response) { //Descargamos la version.json
                version.descargado = response;
                leerArchivo(version, function(obj) {
                    version.web = obj.data.Capacitacion.ID;
                    comprobarVersion();
                });
            });


        } else {
            console.log("Versión web");
            $http.get('js/version.JSON').then(function(response) {
                nutrifami.training.initClient(response.data, function() {
                    $location.path(destino);
                });
            }, function errorCallback(err) {
                console.log(err);

            });
        }

        /* PreloadService.comprobarVersion(function() {
            console.log("Pasa algo");
        })
*/

    });
});
