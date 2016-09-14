nutrifamiMobile.factory('UsuarioService', function () {
    var service = {};

    /**
     * 
     * @returns {Array|Object}
     *  UsuarioService.getUsuarioActivo()
     */
    service.getUsuarioActivo = function () {
        return JSON.parse(localStorage.getItem('usuarioActivo'));
    };

    /**
     * 
     * @returns {Array|Object}
     * UsuarioService.getUsuarioAvance()
     */
    service.getUsuarioAvance = function () {
        return JSON.parse(localStorage.getItem('usuarioAvance'));
    };


    return service;
});
