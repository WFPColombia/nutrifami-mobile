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

    /**
     * 
     * @param {type} usuarioAvance
     * @returns {undefined}
     * 
     * UsuarioService.setUsuarioAvance(usuarioAvance)
     */

    /**
     * 
     * @param {type} usuarioAvance
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     * 
     * UsuarioService.setUsuarioAvance(usuarioAvance, data, function(response)){}
     */
    service.setUsuarioAvance = function (usuarioAvance, data, callback) {
        callback = callback || function () {
        };

        nutrifami.avance.addAvance(data, function (response) {
            if (response.success) {
                localStorage.setItem("usuarioAvance", JSON.stringify(usuarioAvance));
                callback(response);
            }
        });
    };


    return service;
});
