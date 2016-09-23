nutrifamiMobile.factory('PerfilService', function () {
        var service = {};
        /**
         * 
         * @param {type} usuario
         * @param {type} callback
         * @returns {undefined}
         */
        

        service.agregarFamiliar = function (familiar, callback) {
            nutrifami.agregarFamiliar(familiar, function (response) {
                callback(response);
            });

        };
        return service;
    });
