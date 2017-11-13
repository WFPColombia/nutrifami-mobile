nutrifamiMobile.factory('UserService', function UserService($rootScope, $auth) {

    var service = {};

    /**
     * @description Retorna el token de usuario
     * @returns {unresolved}
     */
    service.getToken = function() {
        return $auth.getToken();
    };

    /**
     * @description Retorna verdadero si el usuario se encuentra autenticado dentro de la aplicación
     * @returns {boolean}
     */
    service.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    /**
     * 
     * @param {type} provider
     * @returns {undefined}
     * @param {type} provider
     * @returns {undefined}
     */
    service.authenticate = function(provider) {
        console.log("authenticate");
        $auth
            .authenticate(provider)
            .then(this.successAuth)
            .catch(this.failedAuth);
    };

    /**
     * 
     * @param {type} username
     * @param {type} password
     * @returns {undefined}
     */
    service.loginCedula = function(username, password) {
        nutrifami.login(username, password, function(response) {
            if (response.success) {
                if (response.data.response === 1) {
                    response.data.access_token = 'no-token';
                    response.data.username = username;
                    //preparar el objeto para guardarlo luego
                    console.log(response);
                    service.successAuth(response);
                } else {
                    service.failedAuth({ message: 'El documento es incorrecto' });
                }
            } else {
                service.failedAuth({ message: 'Ha ocurrido un error durante la ejecución' });
            }
        });
    };

    service.login = function(username, password) {
        var user = {
            username: username,
            password: password
        };
        $auth.login(user)
            .then(function(response) {
                // Redirect user here after a successful log in.
                console.log(response.data);
                //organizamos la respuesta para pasarla al SuccesAuth y que se guarden bien todos los datos
                var response2 = {
                    data: response.data.user
                };
                response2.data.access_token = response.data.token;

                service.successAuth(response2);
            })
            .catch(function(response) {
                service.failedAuth({ message: 'Los datos ingresados no son correctos, inténtelo nuevamente' });
            });
    };

    /**
     * @description Cierra sesión de $auth, elimina el usuario de la cache y lanza evento UserLoogedOut de Ionic
     * @returns {undefined}
     */
    service.logOut = function() {
        $auth.logout();
        $rootScope.globals = {};
        localStorage.removeItem('globals');
        localStorage.removeItem("usuarioActivo");
        localStorage.removeItem("usuarioAvance");
        localStorage.removeItem("usuarioFamilia");
        localStorage.removeItem("usuarioFamiliaAvance");
        localStorage.removeItem("misCompras");
        $rootScope.$emit('userLoggedOut');
    };

    /**
     * @description Guard
     * @param {type} user
     * @returns {None}a la información de usuario en la memoria cache
     * @param {object} user
     * @returns {None}
     */
    service.setUser = function(data) {
        var usuarioActivo = data;
        var usuarioAvance = {};
        var usuarioFamiliaAvance = {};
        var usuarioFamilia = {};
        if (data.access_token === 'no-token') {
            /* Se copia la información de avance en un objeto independiente y se elimina la información de usuarioActivo*/
            usuarioAvance = usuarioActivo.avance[usuarioActivo.id];
            /* Se copia la informaciòn de avance de familia a un objeto independiente*/
            usuarioFamiliaAvance = usuarioActivo.avance;
            delete usuarioActivo["avance"];
            delete usuarioFamiliaAvance[usuarioActivo.id];

            /*Se copia información de familia de usuario Activo en objeto independiente*/
            usuarioFamilia = usuarioActivo.familia;
            delete usuarioActivo["familia"];

            /* Se almacena usuario activo en el locaStorage para llamarlo más facilmente */

            localStorage.setItem("usuarioAvance", JSON.stringify(usuarioAvance));
            localStorage.setItem("usuarioFamiliaAvance", JSON.stringify(usuarioFamiliaAvance));
            localStorage.setItem("usuarioFamilia", JSON.stringify(usuarioFamilia));
        }else{
            localStorage.setItem("usuarioAvance", JSON.stringify({}));
            localStorage.setItem("usuarioFamiliaAvance", JSON.stringify({}));
            localStorage.setItem("usuarioFamilia", JSON.stringify({}));
        }

        $rootScope.globals = {
            currentUser: {
                username: 'usuarioActivo.username',
                id: 'usuarioActivo.id'
            }
        };
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
        localStorage.setItem("globals", JSON.stringify($rootScope.globals));
    };


    /**
     * @description Devuelve la informacion de usuario guardada en cache
     * @returns {Array|Object}
     */
    service.getUser = function() {
        return JSON.parse(localStorage.getItem('user'));;
    };

    /**
     * 
     * @param {type} response
     * @returns {undefined}
     */
    service.successAuth = function(response) {
        console.log("successAuth");
        console.log(response);
        $auth.setToken(response.access_token);
        service.setUser(response);
        $rootScope.$emit('userLoggedIn', { data: response.data });
    };

    /**
     * 
     */
    service.failedAuth = function(response) {
        console.log("failedAuth");
        $rootScope.$emit('userFailedLogin', response);
    };

    return service;
});