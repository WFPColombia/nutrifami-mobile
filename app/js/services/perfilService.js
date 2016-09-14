nutrifamiMobile.factory('PerfilService', function () {
        var service = {};
        /**
         * 
         * @param {type} usuario
         * @param {type} callback
         * @returns {undefined}
         */
        service.editarUsuario = function (usuario, callback) {
            nutrifami.editarUsuarioActivo(usuario, function (response) {
                callback(response);
            });

        };

        service.agregarFamiliar = function (familiar, callback) {
            nutrifami.agregarFamiliar(familiar, function (response) {
                callback(response);
            });

        };
        return service;
    });
