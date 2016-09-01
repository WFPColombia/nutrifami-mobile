nutrifamiMobile.factory('ConsumoService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function () {
        var service = {};

        /*
         * @param {object} usuario
         * @param {function} callback
         * ConsumoService.agregarFamiliar(usuario, function (response){});
         */
        service.getConsolidadoCompras = function (usuario, callback) {
            nutrifami.consumo.getConsolidadoCompras(usuario, function (response) {
                callback(response);
            });

        };
        /*
         * @param {object} puntoVenta
         * @param {function} callback
         * ConsumoService.getProductosPuntoVenta(puntoVenta, function (response){});
         */
        service.getProductosPuntoVenta = function (puntoVenta, callback) {
            nutrifami.consumo.getProductosPuntoVenta(puntoVenta, function (response) {
                callback(response);
            });

        };
        return service;
    }]);
