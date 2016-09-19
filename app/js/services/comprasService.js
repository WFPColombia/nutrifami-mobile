nutrifamiMobile.factory('ComprasService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function () {
        var service = {};

        /**
         * 
         * @param {type} usuario
         * @param {type} callback
         * @returns {undefined}
         * ComprasService.getConsolidadoCompras(usuario, function (response){});
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
                    success: true,
                    data: misCompras
                };
                callback(response);
            }
        };
        
        /**
         * 
         * @param {type} usuario
         * @param {type} callback
         * @returns {undefined}
         * 
         * ComprasService.getConsolidadoComprasUltimoMes(usuario,function(response){});
         * 
         */
        service.getConsolidadoComprasUltimoMes = function (usuario, callback) {
            this.getConsolidadoCompras(usuario, function (response) {
                if (response.success) {
                    if (Object.keys(response.data).length > 0) {
                        response.puntoVenta = response.data.punto_venta_id;
                        var consumoUltimoMes = ordenarGrupos(getLast(getLast(response.data.redencion)));
                        console.log(consumoUltimoMes);
                        for (var i in consumoUltimoMes) {
                            consumoUltimoMes[i].porcentaje_visual = calcularPorcentaje(consumoUltimoMes[i].porcentaje_compra, consumoUltimoMes[i].porcentaje_recomendado);
                        }
                        response.data = consumoUltimoMes;
                    }
                    else {
                        response.success = false;
                        response.mensaje = "No hay datos";
                    }
                }
                callback(response);
            });
        };

        service.getConsolidadoComprasUltimoMesByGroup = function () {

        };

        /**
         * 
         * @param {type} puntoVenta
         * @param {type} callback
         * @returns {undefined}
         * ComprasService.getProductosPuntoVenta(puntoVenta, function (response){});
         */
        service.getProductosPuntoVenta = function (puntoVenta, callback) {
            var miPuntoVenta = JSON.parse(localStorage.getItem('puntoVenta'));
            if (miPuntoVenta === null) {
                nutrifami.consumo.getProductosPuntoVenta(puntoVenta, function (response) {
                    localStorage.setItem("puntoVenta", JSON.stringify(response.data));
                    callback(response);
                });
            } else {
                var response = {
                    success: true,
                    data: miPuntoVenta
                };
                callback(response);
            }
        };

        function getLast(myObj) {
            var keys = [];
            for (var k in myObj) {
                if (myObj.hasOwnProperty(k)) {
                    keys.push(myObj[k]);
                }
            }
            keys.sort(); /*Organiza el arreglo*/
            keys.reverse(); /*Lo invierte para obtener el ultimo*/
            return keys[0];
        }

        function ordenarGrupos(myObj) {
            var consumoOrganizado = [];
            for (var i = 1; i <= 9; i++) {
                for (var j in myObj.grupo) {
                    if (myObj.grupo[j].grupo_id == i) {
                        consumoOrganizado.push(myObj.grupo[j]);
                    }
                }
            }
            return(consumoOrganizado);
        }

        function calcularPorcentaje(valor, maximo) {
            if (maximo === 0) {
                maximo = 0.1;
            }
            var porcentaje = (100 / maximo) * valor;
            if (porcentaje > 100) {
                porcentaje = 100;
            }
            return porcentaje;
        }

        return service;
    }]);
