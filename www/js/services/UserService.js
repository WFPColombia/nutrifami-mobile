nutrifamiMobile.factory('UserService', function UserService($rootScope, $auth) {

    var service = {};
    var userData = $auth.getPayload();

    /**
     * 
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

    service.authenticate = function(provider) {
        $auth
            .authenticate(provider)
            .then(this.successAuth)
            .catch(this.failedAuth);
    };
    
    
    /**
     * @description Cierra sesión de $auth, elimina el usuario de la cache y lanza evento UserLoogedOut de Ionic
     * @returns {undefined}
     */
    service.logOut = function() {
        $auth.logout();
        localStorage.removeItem("user");
        $rootScope.$emit('userLoggedOut');
    };
    
    /**
     * @description Guarda la información de usuario en la memoria cache
     * @param {object} user
     * @returns {None}
     */
    service.setUser = function(user){
        localStorage.setItem("user", JSON.stringify(user));
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
        console.log(response);
        $auth.setToken(response.data.token);
        service.setUser(response.data);
        $rootScope.$emit('userLoggedIn', { data: userData });
    };

    service.failedAuth = function() {
        userData = undefined;
        $rootScope.$emit('userFailedLogin');
    };
    
    return service;
});