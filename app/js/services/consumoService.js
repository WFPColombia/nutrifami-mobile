nutrifamiMobile.factory('ConsumoService', ['$http', '$cookieStore', '$rootScope', '$timeout',
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
            nutrifami.consumo.getConsolidadoCompras(usuario, function (response) {
                callback(response);
            });
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
