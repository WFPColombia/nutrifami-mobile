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
        callback = callback || function () {};
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


    /**
     * 
     * @param {type} int: id del módulo
     * @returns {Boolean}
     * @description Retorna True si las imagenes del módulo ya fueron descargas en la aplicación
     */
    service.imagenesDescargadas = function (mid) {
        mid = mid || 16;
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));

        if (gestorDescarga.modulos[mid]['imagenes']) {
            return true;

        } else {
            return false;
        }
    };

    /**
     * 
     * @param {type} mid
     * @returns {Boolean}
     * @description Retorna True si los audios del módulo ya fueron descargos
     */
    service.audiosDescargados = function (mid) {
        mid = mid || 16;
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));

        if (gestorDescarga.modulos[mid]['audios']) {
            return true;

        } else {
            return false;
        }
    };



    service.descargarModulo = function (mid) {
        console.log("Descargar modulo");
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));

        console.log("imagenes descargadas: " + service.imagenesDescargadas(mid));
        if (!service.audiosDescargados(mid)) {
            console.log(1);
            service.descargarImagenes(mid, function () {
                service.descargarArchivo(gestorDescarga.modulos[mid].zip_audios, mid, 'Descargando audios del módulo', function (response) {
                    gestorDescarga.modulos[mid].audios = response;
                    localStorage.setItem("gestorDescarga", JSON.stringify(gestorDescarga));
                    $rootScope.$emit('descargaTerminada', response, mid);
                });
            });
        } else {
            console.log(2);
            $rootScope.$emit('descargaTerminada', true, mid);

        }
    };


    service.descargarImagenes = function (mid) {
        console.log("service.descargarImagenes " + mid);
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));
        if (!service.imagenesDescargadas(mid)) {
            console.log(1);
            service.descargarArchivo(gestorDescarga.modulos[mid].zip_imagenes, mid, 'Descargando imágenes del módulo', function (response) {
                gestorDescarga.modulos[mid].imagenes = response;
                localStorage.setItem("gestorDescarga", JSON.stringify(gestorDescarga));
                $rootScope.$emit('descargaTerminada', response, mid);
            });
        } else {
            console.log(2);
            $rootScope.$emit('descargaTerminada', true, mid);
        }

    };

    /**
     * 
     * @param {type} url
     * @param {type} mid
     * @param {type} callback
     * @returns {undefined}
     */
    service.descargarArchivo = function (url, mid, mensaje, callback) {
        console.log("Descargar archivo " + url);
        callback = callback || function () {};
        if (window.cordova) {
            var path = $rootScope.TARGETPATH + mid + ".zip";
            $cordovaFileTransfer.download(url, path, options, trustHosts).then(function (result) {
                console.log(result.nativeURL + " descargado con éxito!! :)");
                service.descomprimirArchivo(path, mid, function (response) {
                    callback(response);
                });
            }, function (err) {
                console.log(err);
                callback(false);
            }, function (progress) {
                $timeout(function () {
                    var downloadProgress = (progress.loaded / progress.total) * 100;
                    console.log("Descargando " + url + " " + downloadProgress + "%");
                    var response = {
                        mensaje: mensaje,
                        porcentaje: downloadProgress.toFixed(1)
                    };
                    $rootScope.$emit('actualizarCargador', response);
                });
            });
        } else {
            callback(true);
        }

    };

    service.descomprimirArchivo = function (path, nombre, callback) {
        callback = callback || function () {};
        console.log("Descomprimiendo archivo");
        $cordovaZip.unzip(path, $rootScope.TARGETPATH).then(function (response) {
            console.log(response);
            $cordovaFile.removeFile($rootScope.TARGETPATH, nombre + ".zip")
                    .then(function (success) {
                        console.log("Archivo " + path + " eliminado con éxito");
                        callback(true);
                    }, function (error) {
                        console.log(error);
                        callback(false);
                    });
        }, function (err) {
            console.log(err);
            callback(false);
        }, function (progress) {
            var unzipProgress = parseInt((progress.loaded / progress.total) * 100);
            var response = {
                mensaje: "Descomprimiendo",
                porcentaje: unzipProgress
            };
            $rootScope.$emit('actualizarCargador', response);
        });
    };


    return service;
});