/*global angular*/
nutrifamiMobile.controller('PreloadController', function($ionicPlatform, $http, $scope, $rootScope, $timeout, $q, $location, $cordovaFileTransfer) {
    'use strict';
    $ionicPlatform.ready(function() {

        console.log($rootScope.TARGETPATH);

        $scope.url = url;
        $scope.targetPath = targetPath;
        $scope.trustHosts = trustHosts;
        $scope.response = "";
        $scope.imagenPrueba = '';



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


        /* Descargamos el archivo json de capacitaciones*/
        if (window.cordova) {
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function(result) {
                    // Success!
                    $scope.response = "capacitación cargada con éxito!! :)";
                    console.log("capacitación cargada con éxito!! :)");
                    cargarArchivo(targetPath, function() {
                        console.log("Descargar assets");
                        predescargaAssets();
                        //$location.path('/login');
                    });
                }, function(err) {
                    // Error
                    $scope.response = err;
                }, function(progress) {
                    $timeout(function() {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    });
                });
        } else {
            cargarArchivo(targetPath, function() {


                predescargaAssets();
                //$location.path('/login');
            });
        }


        function cargarArchivo(archivo, callback) {
            callback = callback || function() {};
            /* Intentamos cargar el archivo json */
            $http.get(archivo).then(function(response) {
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
            /*Descargar modulos*/

            var serv_modulos = $scope.myData.serv_modulos;
            var assets = ['titulo', 'descripcion', 'imagen', 'imagen2'];
            for (var i in serv_modulos) {
                for (var j in assets) {
                    if (j < 2) {
                        if (serv_modulos[i][assets[j]].audio.nombre != "") {
                            var asset = serv_modulos[i][assets[j]].audio;
                        }
                    } else {
                        if (serv_modulos[i][assets[j]].nombre != "") {
                            var asset = serv_modulos[i][assets[j]];
                        }
                    }
                    recursos.push(asset);
                }
            }

            /* Descargar leccion */


            var serv_lecciones = $scope.myData.serv_lecciones;

            assets = ['titulo', 'finalizado', 'imagen'];

            for (var i in serv_lecciones) {
                for (var j in assets) {
                    if (j < 2) {
                        if (serv_lecciones[i][assets[j]].audio.nombre != "") {
                            var asset = serv_lecciones[i][assets[j]].audio;
                        }

                    } else {
                        if (serv_lecciones[i][assets[j]].nombre != "") {
                            var asset = serv_lecciones[i][assets[j]];
                        }

                    }

                    recursos.push(asset);
                }
            }

            /*Descargar unidades */

            /*var serv_unidades = $scope.myData.serv_unidades;

            assets = ['titulo', 'instruccion', 'imagen', 'audio'];
            var assets_opciones = ['feedback', 'audio'];

            for (var i in serv_unidades) {
                for (var j in assets) {
                    if (j < 2) {
                        if (typeof serv_unidades[i][assets[j]] !== 'undefined' && serv_unidades[i][assets[j]].audio.nombre != "") {
                            var asset = serv_unidades[i][assets[j]].audio;
                        }
                    } else {
                        if (typeof serv_unidades[i][assets[j]] !== 'undefined' && serv_unidades[i][assets[j]].nombre != "") {
                            var asset = serv_unidades[i][assets[j]];
                        }
                    }
                    for (var k in serv_unidades[i].opciones) {
                        //console.log("Opción");
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
                            recursos.push(asset);
                        }
                    }
                }
            }*/

            $scope.recursos = recursos;

            descargarArchivos(recursos);

        }

        function descargarArchivos(recursos) {
            console.log(recursos);

            var promises = [];

            recursos.forEach(function(i, x) {
                url = i.url;
                targetPath = "" + i.nombre;
                $scope.url = url;
                $scope.targetPath = targetPath;
                if (window.cordova) {
                    var targetPath = cordova.file.applicationStorageDirectory + i.nombre;
                    promises.push($cordovaFileTransfer.download(url, targetPath, {}, true).then(function(result) {
                        $scope.response = "Descarga archivo completada";

                    }, function(err) {
                        $scope.response = err;
                    }, function(progress) {
                        $timeout(function() {
                            $scope.url = url;
                            $scope.response = "Archivo descargado";
                            $scope.targetPath = targetPath;
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                        });
                    }));
                }
            });

            $q.all(promises).then(function(res) {
                console.log("in theory, all done");
                if (window.cordova) {
                    $scope.imagenPrueba = cordova.file.applicationStorageDirectory + "training/images/20168316114676.png";

                }
                $location.path('/login');


            });

            /*
                        if (window.cordova) {

                            url = asset.url;
                            targetPath = cordova.file.applicationStorageDirectory + asset.nombre;
                            $scope.url = url;
                            $scope.targetPath = targetPath;
                            console.log(url);
                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function(result) {
                                $scope.response = "Archivo descargado";
                                console.log(url + ": Archivo descargado");
                            }, function(err) {
                                $scope.response = err;
                            }, function(progress) {
                                $timeout(function() {
                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                });
                            });
                        }
            */


        }
    });
});
