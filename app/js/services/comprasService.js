nutrifamiMobile.factory('ComprasService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function () {
        var service = {};

        /**
         * 
         * @param {type} usuario
         * @param {type} callback
         * @returns {undefined}
         * ComprasService.agregarFamiliar(usuario, function (response){});
         */
        service.getConsolidadoCompras = function (usuario, callback) {
            var misCompras = JSON.parse(localStorage.getItem('misCompras'));

            if (misCompras === null) {
                console.log("CargaTodo");
                nutrifami.consumo.getConsolidadoCompras(usuario, function (response) {
                    localStorage.setItem("misCompras", JSON.stringify(response.data));
                    callback(response);
                });
            } else {
                console.log("Ya no carga nada");
                var response = {
                    success :true,
                    data:misCompras
                };
                callback(response);
            }
        };

        /**
         * 
         * @param {type} puntoVenta
         * @param {type} callback
         * @returns {undefined}
         * @param {type} puntoVenta
         * @param {t
         * @param {type} puntoVenta
         * @param {type} callback
         * @returns {undefined}ype} callback
         * @returns {undefined}
         * @param {type} puntoVenta
         * @param {type} callback
         * @returns {undefined}
         * ComprasService.getProductosPuntoVenta(puntoVenta, function (response){});
         */
        service.getProductosPuntoVenta = function (puntoVenta, callback) {
            var miPuntoVenta = JSON.parse(localStorage.getItem('puntoVenta'));
            
            if(miPuntoVenta === null){
                nutrifami.consumo.getProductosPuntoVenta(puntoVenta, function (response) {
                    console.log("Carga Punto de venta");
                    localStorage.setItem("puntoVenta", JSON.stringify(response.data));
                    callback(response);
            });
            }else{
                console.log("Carga Punto de venta desde LS");
                var response = {
                    success :true,
                    data:miPuntoVenta
                };
                callback(response);
            }
        };
        return service;
    }]);
