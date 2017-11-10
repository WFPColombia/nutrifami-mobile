/*global angular*/
nutrifamiMobile.controller('PreloadCtrl', function ($ionicPlatform, $ionicLoading, $ionicPopup, $http, $scope, $cordovaZip, $rootScope, $timeout, $q, $location, $cordovaFile, $cordovaFileTransfer, $cordovaNetwork, UsuarioService, DescargaService, CapacitacionService) {
    'use strict';
    $ionicPlatform.ready(function () {

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

        if (window.cordova){
            window.plugins.insomnia.keepAwake(function () {
                console.log("inmsonia ok");
            }, function () {
                console.log("insomnia error");
            });

        }




        var assetsInfo = {
            'alias': 'training',
            'nombre': 'training.zip',
            'url': 'https://s3.amazonaws.com/capacitaciones/training.zip',
            'path': encodeURI($rootScope.TARGETPATH + "training.zip"),
            'descargado': false,
            'descomprimido': false
        };

        //Verificar el destino
        var destino = "/login";
        var puedeEntrar = false;
        if (UsuarioService.getUsuarioActivo() != null) {
            puedeEntrar = true;
            destino = '/app/';
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
            comprobarArchivosExistentes(recursos).then(function (response) {
                archivosFaltantes = response;
                $scope.totalArchivos = archivosFaltantes.length;
                descargarAsset(0);
            });
        }

        function comprobarArchivosExistentes(recursos) {

            var deferred = $q.defer();
            var archivosExistentes = 0;
            var promises = [];
            recursos.forEach(function (i, x) {
                /*promises.push($http.get($rootScope.TARGETPATH + i.nombre).then(function(response) {
                 archivosExistentes++;
                 recursos[x].loaded = true;
                 }, function errorCallback(response) {
                 if (typeof recursos[x] !== 'undefined' || recursos[x] !== '') {
                 recursos[x].loaded = false;
                 }
                 }));*/

                promises.push($cordovaFile.checkFile($rootScope.TARGETPATH, i.nombre)
                        .then(function (success) {
                            archivosExistentes++;
                            recursos[x].loaded = true;
                        }, function (error) {
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

        function descargarAsset(id) {
            if (archivosFaltantes[id]) {
                //console.log(!archivosFaltantes[id].loaded);
                if (window.cordova) {
                    if (!archivosFaltantes[id].loaded) {
                        var url = encodeURI(archivosFaltantes[id].url);
                        var targetPath = $rootScope.TARGETPATH + archivosFaltantes[id].nombre;
                        console.log(targetPath);
                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                .then(function (entry) {
                                    // Success!
                                    console.log("Descarga completa: " + archivosFaltantes[id].nombre);
                                    //$scope.response = "Descarga archivo completada";
                                    archivosDescargados++;
                                    $scope.archivosDescargados = archivosDescargados;
                                    descargarAsset(id + 1);
                                }, function (error) {
                                    console.log("Error al descargar " + archivosFaltantes[id].nombre);
                                    console.log(error);
                                    $scope.response = error.http_status;
                                    $scope.errores.push(error);
                                    archivosError++;
                                    $scope.archivosError = archivosError;
                                    descargarAsset(id + 1);
                                }, function (progress) {
                                    $timeout(function () {
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
        $scope.errorDescarga = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Error en la desarga',
                template: 'Hubo un error en la descarga de archivos, verifique la conexión a Internet e inténtelo más tarde!',
                okText: 'Salir'
            });
            alertPopup.then(function (res) {
                ionic.Platform.exitApp();
            });
        };

        function initClient() {
            if (DescargaService.isOnline()) {
                DescargaService.hayNuevaVersion(function (response) {
                    if (response) {
                        console.log("Existe una nueva versión de la capacitación");
                        DescargaService.actualizarCapacitacion(function () {
                            $location.path(destino);
                        });
                    } else {
                        console.log("Capacitación actualizada");
                        $location.path(destino);
                    }
                });
            } else {
                if (puedeEntrar) {

                    $scope.modal = {
                        texto1: 'Sin conexión a Internet',
                        texto2: 'Podrá usar Nutrifami sin Conexión a Internet, pero los cambios no serán guardados'
                    };
                    $scope.buttonsModal = [{
                            text: 'Continuar',
                            type: 'button-positive',
                            onTap: function (e) {
                                $location.path('/app/');
                            }
                        }];
                } else {

                    $scope.modal = {
                        texto1: 'Sin conexión a Internet',
                        texto2: 'Para poder usar Nutrifami sin Conexión a Internet, Debe haber iniciado sesión al menos una vez y haber descargado las capacitaciones'
                    };
                    $scope.buttonsModal = [{
                            text: 'Salir',
                            type: 'button-positive',
                            onTap: function (e) {
                                ionic.Platform.exitApp();
                            }
                        }];
                }
                $ionicPopup.show({
                    templateUrl: 'views/modals/modal.html',
                    scope: $scope,
                    cssClass: 'salir-unidad',
                    buttons: $scope.buttonsModal
                });
            }
        }

        $rootScope.$on('errorDescarga', function (event, data) {
            console.log(data.message);
        });

        initClient();


    });
});