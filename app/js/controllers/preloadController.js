/*global angular*/
nutrifamiMobile.controller('PreloadController', function ($ionicPlatform, $http, $scope, $rootScope, $timeout, $q, $location, $cordovaFileTransfer) {
    'use strict';
    $ionicPlatform.ready(function () {

        console.log($rootScope.TARGETPATH);

        var targetPath = '';
        var url = "http://nutrifami.org/js/capacitacion.JSON";
        var trustHosts = true;
        var options = {};

        if (window.cordova) {
            targetPath = cordova.file.applicationStorageDirectory + "capacitacion.JSON";
        } else {
            console.log("Carga arhivo json local")
            targetPath = "js/capacitacion.JSON";
        }

        $scope.url = url;
        $scope.targetPath = targetPath;
        $scope.trustHosts = trustHosts;
        $scope.response = "";
        $scope.imagenPrueba = '';
        $scope.totalArchivos = 0;
        $scope.archivosDescargados = 0;
        $scope.archivosError = 0;
        $scope.errores = [];

        /* Descargamos el archivo json de capacitaciones*/
        if (window.cordova) {
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                    .then(function (result) {
                        // Success!
                        $scope.response = "capacitación cargada con éxito!! :)";
                        cargarCapacitacion(targetPath, function () {
                            predescargaAssets();
                        });
                    }, function (err) {
                        // Error
                        $scope.response = err;
                    }, function (progress) {
                        $timeout(function () {
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                        });
                    });
        } else {
            cargarCapacitacion(targetPath, function () {
                predescargaAssets();
            });
        }


        function cargarCapacitacion(archivo, callback) {
            callback = callback || function () {
            };
            /* Intentamos cargar el archivo json */
            $http.get(archivo).then(function (response) {
                $scope.myData = response.data;
                nutrifami.training.initClient(response.data);
                callback();

            }, function errorCallback(response) {
                $scope.response = response.statusText;
                callback();
            });
        }

        function predescargaAssets() {

            var recursos = [];
            var opciones = [];

            /* Preparar modulos*/
            var serv_modulos = $scope.myData.serv_modulos;
            var assets = ['titulo', 'descripcion', 'imagen', 'imagen2'];
            var asset = '';
            for (var i in serv_modulos) {
                for (var j in assets) {
                    if (j < 2) {
                        if (serv_modulos[i][assets[j]].audio.nombre != "") {
                            asset = serv_modulos[i][assets[j]].audio;
                        }
                    } else {
                        if (serv_modulos[i][assets[j]].nombre != "") {
                            asset = serv_modulos[i][assets[j]];
                        }
                    }
                    recursos.push(asset);
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
                    recursos.push(asset);
                }
            }

            /* Preparar unidades */
            var serv_unidades = $scope.myData.serv_unidades;
            assets = ['titulo', 'instruccion', 'imagen', 'audio'];
            var assets_opciones = ['feedback', 'audio'];

            for (var i in serv_unidades) {
                for (var j in assets) {
                    if (j < 2) {
                        if (typeof serv_unidades[i][assets[j]] !== 'undefined' && serv_unidades[i][assets[j]].audio.nombre != "") {
                            asset = serv_unidades[i][assets[j]].audio;
                        }
                    } else {
                        if (typeof serv_unidades[i][assets[j]] !== 'undefined' && serv_unidades[i][assets[j]].nombre != "") {
                            asset = serv_unidades[i][assets[j]];
                        }
                    }
                    recursos.push(asset);
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
                        opciones.push(asset);
                    }
                }
            }
            
            var lotes = [];
            
            lotes.push(comprobarArchivosExistentes(recursos, function (response) {
                descargarArchivosFaltantes(response);

            }));

            lotes.push(comprobarArchivosExistentes(opciones, function (response) {
                descargarArchivosFaltantes(response);
            }));
            
            /*$q.all(lotes).then(function (res) {
                console.log("Todos los lotes cargados");
                console.log("Redireccionar");
            });*/
            
            
        }

        function comprobarArchivosExistentes(recursos, callback) {
            callback = callback || function () {
            };
            
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
                    recursos[x].loaded = false;
                }));

            });

            $q.all(promises).then(function (res) {
                console.log("Archivos existentes comprobados");
                $scope.archivosExistentes = archivosExistentes;
                callback(recursos);
            });

        }

        function descargarArchivosFaltantes(recursos) {
            console.log("descargarArchivosFaltantes");
            $scope.totalArchivos = recursos.length ;
            var archivosDescargados = 0;
            var archivosError = 0;
            var promises = [];

            recursos.forEach(function (i, x) {
                console.log(i.loaded);
                var url = i.url;
                var targetPath = $rootScope.TARGETPATH + i.nombre;
                $scope.url = url;
                $scope.targetPath = targetPath;

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

                                $scope.response = "Descargando Archivo";
                                $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                            });
                        }));
                    }

                }

            });

            $q.all(promises).then(function (res) {
                console.log("Archivos descargados");
                console.log($scope.errores);
                    $scope.imagenPrueba = $rootScope.TARGETPATH + "training/images/20168316114676.png";
                //$location.path('/login');
            });
        }
    });
});
