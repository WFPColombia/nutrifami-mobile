nutrifamiMobile.factory('ComprasService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function () {
        var service = {};

        /**
         * 
         * @param {type} usuario
         * @param {type} callback
         * @returns {undefined}
         * ConsumoService.agregarFamiliar(usuario, function (response){});
         */
        service.getConsolidadoCompras = function (usuario, callback) {
            var misCompras = JSON.parse(localStorage.getItem('misCompras'));

            if (misCompras === null) {
                console.log("CargaTodo");
                nutrifami.consumo.getConsolidadoCompras(usuario, function (response) {
                    localStorage.setItem("misCompras", JSON.stringify(response.data));
                    callback(response.data);
                });
            } else {
                console.log("Ya no carga nada");
                callback(misCompras);
            }
        };

        /**
         * 
         * @param {type} puntoVenta
         * @param {type} callback
         * @returns {undefined}
         * ConsumoService.getProductosPuntoVenta(puntoVenta, function (response){});
         */
        service.getProductosPuntoVenta = function (puntoVenta, callback) {
            nutrifami.consumo.getProductosPuntoVenta(puntoVenta, function (response) {
                callback(response);
            });

        };
        return service;
    }]);
