/*global angular*/
nutrifamiMobile.controller('PreloadController', function($ionicPlatform, $http, $scope, $ionicLoading, $rootScope, $timeout, $q, $location, $cordovaFileTransfer) {
    'use strict';
    $ionicPlatform.ready(function() {

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
        var archivosFaltantes = [];
        var archivosDescargados = 0;
        var archivosError = 0;

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
            targetPath = $rootScope.TARGETPATH + "capacitacion.JSON";
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function(result) {
                    // Success!
                    $scope.response = "capacitación cargada con éxito!! :)";
                    cargarCapacitacion(targetPath, function() {
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
            targetPath = "js/capacitacion.JSON";
            cargarCapacitacion(targetPath, function() {
                //predescargaAssets();
                $ionicLoading.hide();
                $location.path('/login');
            });
        }


        function cargarCapacitacion(archivo, callback) {
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
                                $scope.response = "Descarga archivo completada";
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
                                    $scope.response = "Descargando Archivo";
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
