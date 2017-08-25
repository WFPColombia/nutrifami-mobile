nutrifamiMobile.factory('RecetasService', function($http) {

    var service = {};
    var token = ''

    service.Login = function(username, password, callback) {
        callback = callback || function() {};
        var response = {
            'success': false,
            'message': ''

        };
        $http({
            method: 'POST',
            url: 'http://recetas.nutrifami.org/api-token-auth/',
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
            console.log(ver_servidor)
            if (recetas.version != ver_servidor) {

                service.downloadRecetas(function(response) {
                    recetas.version = ver_servidor
                    recetas.data = response.data
                    localStorage.setItem("recetas", JSON.stringify(recetas));
                    console.log("Versión actulizada");
                    callback(recetas);
                })
            } else {
                console.log("Versión no actulizada")
                callback(recetas);
            }
        });




    }

    service.leerRecetas = function(callback) {
        recetas = JSON.parse(localStorage.getItem('recetas'));
        if (recetas === null) {
            var response = {
                version: 0,
                data: []
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
            url: 'http://recetas.nutrifami.org/versiones.json',
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
            url: 'http://recetas.nutrifami.org/recetas.json',
        }).then(function successCallback(response) {
            callback(response);
        }, function errorCallback(response) {
            callback(response);
        });
    }


    return service;

});