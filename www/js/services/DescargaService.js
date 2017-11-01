nutrifamiMobile.factory('DescargaService', function UserService($http, $rootScope, $cordovaFile, $cordovaFileTransfer, $timeout, $cordovaZip, CapacitacionService) {

    var service = {};
    var trustHosts = true;
    var options = {};
    var BaseUrl = '';
    if (window.cordova) {
        BaseUrl = 'http://nutrifami.org/';
    }

    service.hayNuevaVersion = function (callback) {
        var versionActual = '';
        var versionNueva = '';
        //Comprobamos si existe una version previa
        if (localStorage.getItem('version') !== null) {
            console.log("Existe una versión");
            versionActual = JSON.parse(localStorage.getItem('version'));
        }
//comprobamos la version nueva
        $http.get(BaseUrl + 'js/version.JSON').then(function (response) {
            versionNueva = response.data.Capacitacion.ID;
            console.log(versionNueva + " " + versionActual)
            if (versionActual != versionNueva) {
//Actualizamos el numero de versión
                localStorage.setItem("version", JSON.stringify(versionNueva));
                callback(true);
            } else {
                callback(false);
            }
        }, function errorCallback(err) {
            $rootScope.$emit('errorDescarga', {message: "Hubo un error al intentar comprobar la versión"});
        });
    };


    service.actualizarCapacitacion = function (callback) {
        callback = callback || function () {
        };
        $http.get(BaseUrl + 'js/capacitacionAll.JSON').then(function (response) {
            localStorage.setItem("capacitacion", JSON.stringify(response.data));
            CapacitacionService.initClient();
            service.crearGestorDescargas(response.data);
            callback();
        }, function errorCallback(err) {
            $rootScope.$emit('errorDescarga', {message: "Hubo un error al descargar la capacitación"});
        });
    };


    service.crearGestorDescargas = function (capacitaciones) {

        var gestorDescarga = {
            capacitaciones: {},
            modulos: {}
        };
        for (var i in capacitaciones.serv_capacitaciones) {
            if (i !== 'completo') {
                var tempObject = {};
                tempObject[i] = {
                    zip: capacitaciones.serv_capacitaciones[i].zip,
                    zip_audios: capacitaciones.serv_capacitaciones[i].zip_audios,
                    zip_imagenes: capacitaciones.serv_capacitaciones[i].zip_imagenes,
                    audios: false,
                    imagenes: false
                };
                $.extend(gestorDescarga.capacitaciones, tempObject);
            }
        }

        for (var i in capacitaciones.serv_modulos) {
            var tempObject = {};
            tempObject[i] = {
                zip_audios: capacitaciones.serv_modulos[i].zip_audios,
                zip_imagenes: capacitaciones.serv_modulos[i].zip_imagenes,
                audios: false,
                imagenes: false
            };
            $.extend(gestorDescarga.modulos, tempObject);
        }
        localStorage.setItem("gestorDescarga", JSON.stringify(gestorDescarga));
    };


    service.descargarModulo = function (mid, callback) {
        callback = callback || function () {
        };
        console.log("Pasa algo");
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));

        if (gestorDescarga.modulos[mid].imagenes && gestorDescarga.modulos[mid].audios) {
            console.log(1);
            callback();
        } else if (!gestorDescarga.modulos[mid].imagenes && !gestorDescarga.modulos[mid].audios) {
            console.log(2);
            service.descargarArchivo(gestorDescarga.modulos[mid].zip_imagenes, mid, function () {
                gestorDescarga.modulos[mid].imagenes = true;
                service.descargarArchivo(gestorDescarga.modulos[mid].zip_audios, mid, function () {
                    gestorDescarga.modulos[mid].audios = true;
                    localStorage.setItem("gestorDescarga", JSON.stringify(gestorDescarga));
                    callback();
                });
            });
        } else if (!gestorDescarga.modulos[mid].imagenes) {
            console.log(3);
            service.descargarArchivo(gestorDescarga.modulos[mid].zip_imagenes, mid, function () {
                gestorDescarga.modulos[mid].imagenes = true;
                localStorage.setItem("gestorDescarga", JSON.stringify(gestorDescarga));
                callback();
            });

        } else if (!gestorDescarga.modulos[mid].audios) {
            console.log(4);
            service.descargarArchivo(gestorDescarga.modulos[mid].zip_audios, mid, function () {
                gestorDescarga.modulos[mid].audios = true;
                localStorage.setItem("gestorDescarga", JSON.stringify(gestorDescarga));
                callback();
            });

        }

    };




    service.descargarArchivo = function (url, mid, callback) {
        callback = callback || function () {
        };
        if (window.cordova) {
            var path = $rootScope.TARGETPATH + mid + ".zip";
            $cordovaFileTransfer.download(url, path, options, trustHosts).then(function (result) {
                console.log(path + " descargado con éxito");
                console.log(result.nativeURL);
                service.descomprimirArchivo(path, mid, function () {
                    callback();
                });

            }, function (err) {
                console.log("Error al descargar " + path);
                console.log(err);
                console.log(err.body);
                callback();
            }, function (progress) {
                $timeout(function () {
                    console.log("Descargando archivo " + path);
                });
            });
        } else {
            callback();
        }

    };

    service.descomprimirArchivo = function (path, nombre, callback) {
        callback = callback || function () {
        };
        console.log("Descomprimiendo");
        $cordovaZip.unzip(path, $rootScope.TARGETPATH).then(function (response) {
            console.log(response);
            $cordovaFile.removeFile($rootScope.TARGETPATH, nombre + ".zip")
                    .then(function (success) {
                        console.log("Archivo " + path + " eliminado con éxito");
                        callback();
                    }, function (error) {
                        console.log(error);
                    });
        }, function () {
            console.log("Error al descomprimir " + path);
            callback();
        }, function (progress) {
            console.log("Descomprimiendo " + path);
        });
    };


    return service;
});