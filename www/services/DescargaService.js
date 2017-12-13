nutrifamiMobile.factory('DescargaService', function ($http, $rootScope, $cordovaFile, $cordovaFileTransfer, $cordovaNetwork, $timeout, $cordovaZip,$stateParams, CapacitacionService, UserService) {

    var service = {};
    var trustHosts = true;
    var options = {};
    var BaseUrl = '';
    if (window.cordova) {
        BaseUrl = 'http://nutrifami.org/';
    }

    service.isOnline = function () {
        console.log("isOnline?");
        //Comprobamos la conexión a Internet   
        if (window.cordova) {
            //var isOnline = $cordovaNetwork.isOnline();
            $rootScope.isOnline = $cordovaNetwork.isOnline();
            if ($rootScope.isOnline) {
                return true;
            } else {
                service.errorConexion('El dispositivo no tiene conexión a Internet');
                return false;
            }
        } else {
            return true;
        }
    };

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
            console.log(versionNueva + " " + versionActual);
            if (versionActual != versionNueva || !service.assetsInicialesDescargados() ) {
                //Actualizamos el numero de versión
                localStorage.setItem("version", JSON.stringify(versionNueva));
                callback(true);
            } else {
                callback(false);
            }
        }, function errorCallback(err) {
            service.errorDescarga("Hubo un error al intentar comprobar la versión");
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
            service.errorDescarga("Hubo un error al descargar los datos de la capacitación");
        });
    };


    service.crearGestorDescargas = function (capacitaciones) {
        var gestorDescarga = {
            assetsIniciales: false, //La descarga inicial de archivos
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
    
    service.actualizarGestorDescarga = function(nivel, id, tipo){
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));
        gestorDescarga[nivel][id][tipo] = true;
        if(nivel == 'capacitaciones'){
            mids = CapacitacionService.getModulosId(id);
            for(mid in mids){
                tempMid = mids[mid];
                gestorDescarga['modulos'][tempMid][tipo] = true;
            }
        }
        localStorage.setItem("gestorDescarga", JSON.stringify(gestorDescarga));
    };
    
    
    service.paqueteDescargado = function (nivel,  id, tipo) {
        nivel = nivel || 'capacitaciones';
        id = id || 3;
        tipo = tipo || 'imagenes';
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));
        return gestorDescarga[nivel][id][tipo];
    };
    
    service.paqueteCompletoDescargado = function (nivel,  id) {
        nivel = nivel || 'capacitaciones';
        id = id || 3;
        var imagenes = service.paqueteDescargado(nivel,id,'imagenes');
        var audios = service.paqueteDescargado(nivel,id,'audios');
        return imagenes && audios;
    };
    
    service.assetsInicialesDescargados = function(){
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));

        return gestorDescarga.assetsIniciales;
    }

    /**
     * 
     * @returns {Boolean}
     */
    service.descargaInicial = function () {
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));
        var url = 'https://s3.amazonaws.com/capacitaciones/training.zip';
        var nombre = 'training.zip';
        var mensaje = 'Descargando archivos necesarios!';
        
        service.descargarZip(url, nombre, mensaje,'', function(response){
            if(response){
                gestorDescarga.assetsIniciales = true;
                localStorage.setItem("gestorDescarga", JSON.stringify(gestorDescarga));
                service.descargaTerminada();
            }else{
                service.errorDescarga("Hubo un error al descargar los archivos iniciales");
            }
        });        
    };

    service.descargarPaquete = function (nivel, id, tipo, callback) {
        console.log("Descargar Paquete");
        nivel = nivel || 'capacitaciones';
        id = id || 3;
        tipo = tipo || 'imagenes';
        var abc = {
            'imagenes':'imágenes ',
            'audios':'audios ',
            'modulos':'del módulo.',
            'capacitaciones': 'de la capacitación.'
            
        }
        var gestorDescarga = JSON.parse(localStorage.getItem('gestorDescarga'));
        var url = gestorDescarga[nivel][id]['zip_'+tipo];
        var nombre = nivel+id+tipo+'.zip';
        var mensaje = 'Descargando paquete de '+abc[tipo]+abc[nivel];
        if (!service.paqueteDescargado(nivel, id, tipo)) {
            service.descargarZip(url, nombre, mensaje, nivel, function (response) {
                if (response) {
                    service.actualizarGestorDescarga(nivel, id, tipo);
                    if(typeof callback == 'undefined'){
                        service.descargaTerminada(id);
                    }else{
                        callback();
                    }
                } else {
                    service.errorDescarga("Hubo un error al descargar paquete de archivos ");
                }
            });
        } else {
            if(typeof callback == 'undefined'){
                service.descargaTerminada(id);
            }else{
                callback();
            }
        }  
    };
    
    service.descargarPaqueteCompleto = function(nivel,id){
        console.log("descargar paquete completo");
        service.descargarPaquete(nivel,id,'imagenes',function(){
            service.descargarPaquete(nivel,id,'audios');
        });
    }
     
     
    /**
     * 
     * @param {type} url
     * @param {type} nombre
     * @param {type} mensaje
     * @param {type} callback
     * @returns {undefined}
     */
    service.descargarZip = function (url, nombre, mensaje, nivel, callback) {
        console.log("Descargar archivo " + url);
        callback = callback || function () {
        };
        if (window.cordova) {
            cordova.plugins.backgroundMode.enable();
            var path = $rootScope.TARGETPATH + nombre;
            $cordovaFileTransfer.download(url, path, options, trustHosts).then(function (result) {
                console.log(result.nativeURL + " descargado con éxito!! :)");
                service.descomprimirZip(path, nombre, nivel,function (response) {
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
                    $rootScope.$broadcast('actualizarCargador', response);
                });
            });
        } else {
            callback(true);
        }

    };

    service.descomprimirZip = function (path, nombre, nivel, callback) {
        callback = callback || function () {
        };
        
        var destinoUnzip = $rootScope.TARGETPATH;
        
        if(nivel == 'modulos'){
            destinoUnzip = $rootScope.TARGETPATH+$stateParams.capacitacion;
        }
        console.log("Descomprimiendo archivo");
        $cordovaZip.unzip(path, destinoUnzip).then(function () {
            $cordovaFile.removeFile($rootScope.TARGETPATH, nombre)
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
            $rootScope.$broadcast('actualizarCargador', response);
        });
    };

    service.descargaTerminada = function (id) {
        id = id || '';
        if (window.cordova) {
            cordova.plugins.backgroundMode.disable();
        }
        $rootScope.$broadcast ('descargaTerminada', id);
    };
    
    service.errorDescarga = function (mensaje) {
        if (window.cordova) {
            cordova.plugins.backgroundMode.disable();
        }
        $rootScope.$broadcast ('errorDescarga', mensaje);
    };
    
    service.errorConexion = function (mensaje) {
        if (window.cordova) {
            cordova.plugins.backgroundMode.disable();
        }
        $rootScope.$broadcast('errorConexion', mensaje);
    };
    
    return service;
});