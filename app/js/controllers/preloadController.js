/*global angular*/
nutrifamiMobile.controller('PreloadController', function($ionicPlatform, $http, $scope, $timeout, $location, $cordovaFileTransfer) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.url = url;
        $scope.targetPath = targetPath;
        $scope.trustHosts = trustHosts;
        $scope.response = "";



        var targetPath = '';
        var url = "http://nutrifami.org/js/capacitacion.JSON";
        var trustHosts = true;
        var options = {};

        if (window.cordova) {
            targetPath = cordova.file.applicationStorageDirectory + "capacitacion.JSON";
        } else {
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
                        descargarAssets();
                        $location.path('/login');
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
                descargarAssets();
                $location.path('/login');
            });
        }


        function cargarArchivo(archivo, callback) {
            callback = callback || function() {};
            /* Intentamos cargar el archivo json */
            $http.get(archivo).then(function(response) {
                $scope.myData = response.data;
                console.log($scope.myData);
                nutrifami.training.initClient(response.data);
                callback();

            }, function errorCallback(response) {
                $scope.response = response.statusText;
                callback();
            });
        }

        function descargarAssets() {

            /*Descargar modulos*/

            var serv_modulos = $scope.myData.serv_modulos;
            var assets = ['titulo', 'descripcion', 'imagen', 'imagen2'];
            for (var i in serv_modulos) {
                for (var j in assets) {
                    if (j < 2) {
                        var asset = serv_modulos[i][assets[j]].audio;
                    } else {
                        var asset = serv_modulos[i][assets[j]];
                    }

                    descargarArchivo(asset);
                }
            }

            /* Descargar leccion */


            var serv_lecciones = $scope.myData.serv_lecciones;

            assets = ['titulo', 'finalizado', 'imagen'];

            for (var i in serv_lecciones) {
                for (var j in assets) {
                    if (j < 2) {
                        var asset = serv_lecciones[i][assets[j]].audio;
                    } else {
                        var asset = serv_lecciones[i][assets[j]];
                    }

                    descargarArchivo(asset);
                }
            }

            /*Descargar unidades */

            /*var serv_unidades = $scope.myData.serv_unidades;

            assets = ['titulo', 'instruccion', 'imagen', 'audio'];
            var assets_opciones = ['feedback', 'audio'];

            for (var i in serv_unidades) {
                for (var j in assets) {
                    if (j < 2) {
                        var asset = serv_unidades[i][assets[j]].audio;
                    } else {
                        var asset = serv_unidades[i][assets[j]];
                    }
                    descargarArchivo(asset);

                    for (var k in serv_unidades[i].opciones) {
                        //console.log("Opción");
                        for (var l in assets_opciones) {
                            if (l < 1) {
                                var asset = serv_unidades[i].opciones[k][assets_opciones[l]].audio;
                            } else {
                                var asset = serv_unidades[i].opciones[k][assets_opciones[l]];
                            }
                            descargarArchivo(asset);
                        }
                    }
                }
            }*/

        }

        function descargarArchivo(asset) {
            //console.log(asset);
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
        }
    });
});
