nutrifamiMobile.factory('RecetasService', function($http) {

    var service = {};
    var token = ''
    var URL = 'http://127.0.0.1:8000/';
    //var URL = 'http://recetas.nutrifami.org/';

    service.Login = function(username, password, callback) {
        callback = callback || function() {};
        var response = {
            'success': false,
            'message': ''

        };
        $http({
            method: 'POST',
            url: URL + 'api-token-auth/',
            data: { username: username, password: password }
        }).then(function successCallback(response) {
            console.log(response);
            callback(response);
        }, function errorCallback(response) {
            console.log(response);
            callback(false);
        });

    };

    /**
     * 
     * @param {type} username
     * @param {type} password
     * @param {type} token
     * @returns {undefined}
     */
    service.SaveToken = function(token) {
        localStorage.setItem("Token", JSON.stringify(token));
    };

    service.actualizar = function(callback) {

        var callback = callback || function() {};
        var recetas = {};
        var ver_servidor = 0;


        this.leerRecetas(function(response) {
            recetas = response;
        });

        service.downloadVersion(function(response) {
            ver_servidor = response.version;
            if (recetas.version != ver_servidor) {
                console.log("Actualización disponible")

                service.downloadRecetas(function(response) {
                    recetas.version = ver_servidor
                    recetas.data = response.data
                    for (var receta in recetas.data) {
                        if (recetas.me_gusta[recetas.data[receta].id] == null || recetas.me_gusta[recetas.data[receta].id] == false) {
                            recetas.data[receta]['me_gusta'] = false;

                        } else {
                            recetas.data[receta]['me_gusta'] = true;
                        }
                    }

                    localStorage.setItem("recetas", JSON.stringify(recetas));
                    callback(recetas);
                })
            } else {
                console.log("Recetas actualizadas!! :D")

                callback(recetas);
            }
        });




    }

    service.leerRecetas = function(callback) {
        recetas = JSON.parse(localStorage.getItem('recetas'));
        if (recetas === null) {
            var response = {
                version: 0,
                data: [],
                me_gusta: {},
            }
            callback(response);
        } else {
            token
            callback(recetas);
        }


    }

    /*
    RecetasService.downloadVersion(token, function(response) {
        console.log(response);
    });
    */

    service.downloadVersion = function(callback) {
        var callback = callback || function() {};
        $http({
            method: 'GET',
            url: URL + 'versiones.json',
        }).then(function successCallback(response) {
            callback(response.data[0]);
        }, function errorCallback(response) {
            console.log(response);
            callback(response);
        });
    }

    /*
    RecetasService.downloadVersion(function(response) {
        console.log(response);
    });
    */

    service.downloadRecetas = function(callback) {
        var callback = callback || function() {};
        $http({
            method: 'GET',
            url: URL + 'recetas.json',
        }).then(function successCallback(response) {
            callback(response);
        }, function errorCallback(response) {
            callback(response);
        });
    }

    service.sumarCompartir = function(receta_id, usuario_id) {
        $http({
            method: 'POST',
            url: URL + 'compartidos/',
            data: { receta: receta_id, usuario_id: usuario_id }
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });

    }

    service.sumarMeGusta = function(receta_id, usuario_id) {

        this.leerRecetas(function(response) {
            var recetas = response;
            for (var receta in recetas.data) {
                if (recetas.data[receta].id == receta_id) {
                    recetas.data[receta].me_gustas++;
                    recetas.data[receta].me_gusta = true;
                }
            }
            recetas.me_gusta[receta_id] = true;
            localStorage.setItem("recetas", JSON.stringify(recetas));
        });
        $http({
            method: 'POST',
            url: URL + 'me-gustas/',
            data: { receta: receta_id, usuario_id: usuario_id }
        }).then(function successCallback(response) {

            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });

    }

    service.restarMeGusta = function(receta_id, usuario_id) {

        this.leerRecetas(function(response) {
            var recetas = response;
            for (var receta in recetas.data) {
                if (recetas.data[receta].id == receta_id) {
                    recetas.data[receta].me_gustas--;
                    recetas.data[receta].me_gusta = false;
                }
            }
            recetas.me_gusta[receta_id] = false;
            localStorage.setItem("recetas", JSON.stringify(recetas));
        });


    }


    return service;

});