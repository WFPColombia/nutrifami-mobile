nutrifamiMobile.controller('ConsumoGrupoController', ['$rootScope', '$scope', '$location', '$routeParams', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', 'ngAudio', 'ConsumoService', function ($rootScope, $scope, $location, $routeParams, $anchorScroll, bsLoadingOverlayService, $timeout, ngAudio, ConsumoService) {
        'use strict';
        /* BEGIN CORDOVA FILES
         document.addEventListener('deviceready', function () {
         AndroidFullScreen.immersiveMode();
         END CORDOVA FILES */

        $anchorScroll();

        /* Overloading*/
        bsLoadingOverlayService.start();
        /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
        $scope.$on('$viewContentLoaded', function () {
            /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
             * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
            bsLoadingOverlayService.stop();
        });

        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));



        /* LLAMAR EL OBJETO COMPLETO DE ALGUNA FORMA*/

        //$scope.consumoUltimoMes = ordenarGrupos(getLast(getLast($scope.consumo)));
        var tempObj = {"personas": "4", "cedula": "66976632", "departamento": "VALLE DEL CAUCA", "municipio": "TRUJILLO", "punto_venta_id": "12", "redencion": {"2016": {"6": {"grupo": {"CARNES": {"nombre": "CARNE, PESCADO, HUEVOS Y LEGUMINOSAS SECAS", "alias": "CARNES", "grupo_id": "4", "porcentaje_recomendado": "19", "porcentaje_compra": "4.58", "compra": [{"nombre": "ATUN X 184 GR", "codigo": "40102017", "nombre_generico": "ATUN", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "3600", "cantidad": "3", "total": "10800", "fecha": "2016-06-20"}]}, "CEREALES": {"nombre": "CEREALES", "alias": "CEREALES", "grupo_id": "1", "porcentaje_recomendado": "27", "porcentaje_compra": "45.62", "compra": [{"nombre": "ARROZ ROA 500 GR", "codigo": "40204001", "nombre_generico": "ARROZ", "unidad": "LIBRA", "unidad_prefijo": "LB", "precio_unidad": "1650", "cantidad": "50", "total": "82500", "fecha": "2016-06-20"}, {"nombre": "PAN TAJADO X 500 GRAMOS", "codigo": "40212001", "nombre_generico": "PAN", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "2650", "cantidad": "1", "total": "2650", "fecha": "2016-06-20"}, {"nombre": "PAPA PARDA X GR", "codigo": "40208001", "nombre_generico": "PAPA", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "1.8", "cantidad": "12501", "total": "22501.8", "fecha": "2016-06-20"}]}, "VEGETALES": {"nombre": "FRUTAS Y VERDURAS", "alias": "VEGETALES", "grupo_id": "5", "porcentaje_recomendado": "27", "porcentaje_compra": "1.28", "compra": [{"nombre": "CEBOLLA CABEZONA   X GR", "codigo": "40715004", "nombre_generico": "CEBOLLA CABEZONA", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "5.4", "cantidad": "250", "total": "1350", "fecha": "2016-06-20"}, {"nombre": "TOMATE X GRAMO", "codigo": "40712000", "nombre_generico": "TOMATE", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "3.7", "cantidad": "450", "total": "1665", "fecha": "2016-06-20"}]}, "GRASAS": {"nombre": "GRASAS", "alias": "GRASAS", "grupo_id": "7", "porcentaje_recomendado": "2", "porcentaje_compra": "6.74", "compra": [{"nombre": "ACEITE 500ML VIVI", "codigo": "40401002", "nombre_generico": "ACEITE", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "2650", "cantidad": "6", "total": "15900", "fecha": "2016-06-20"}]}, "LECHELACTEOS": {"nombre": "LECHE Y OTROS PRODUCTOS LACTEOS", "alias": "LECHELACTEOS", "grupo_id": "3", "porcentaje_recomendado": "23", "porcentaje_compra": "7.88", "compra": [{"nombre": "LECHE EN POLVO * 380 RODEO", "codigo": "40507001", "nombre_generico": "LECHE EN POLVO", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "6900", "cantidad": "2", "total": "13800", "fecha": "2016-06-20"}, {"nombre": "QUESO CAMPESINO X GR", "codigo": "40501003", "nombre_generico": "QUESO", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "9.6", "cantidad": "500", "total": "4800", "fecha": "2016-06-20"}]}}}, "7": {"grupo": {"CARNES": {"nombre": "CARNE, PESCADO, HUEVOS Y LEGUMINOSAS SECAS", "alias": "CARNES", "grupo_id": "4", "porcentaje_recomendado": "19", "porcentaje_compra": "17.92", "compra": [{"nombre": "ATUN X 184 GR", "codigo": "40102017", "nombre_generico": "ATUN", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "3600", "cantidad": "2", "total": "7200", "fecha": "2016-07-30"}, {"nombre": "CHULETICAS DE POLLO X 10", "codigo": "40101002", "nombre_generico": "POLLO", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "4900", "cantidad": "1", "total": "4900", "fecha": "2016-07-30"}, {"nombre": "POLLO (PIERNA PERNIL) X GR", "codigo": "40101003", "nombre_generico": "POLLO", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "6.6", "cantidad": "2300", "total": "15180", "fecha": "2016-07-30"}, {"nombre": "CARNE DE RES X GR", "codigo": "40106001", "nombre_generico": "RES", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "15", "cantidad": "1000", "total": "15000", "fecha": "2016-07-30"}]}, "CEREALES": {"nombre": "CEREALES", "alias": "CEREALES", "grupo_id": "1", "porcentaje_recomendado": "27", "porcentaje_compra": "21.33", "compra": [{"nombre": "ARROZ ROA 500 GR", "codigo": "40204001", "nombre_generico": "ARROZ", "unidad": "LIBRA", "unidad_prefijo": "LB", "precio_unidad": "1650", "cantidad": "25", "total": "41250", "fecha": "2016-07-30"}, {"nombre": "AVENA EN HOJUELAS X 250 GR PANCO", "codigo": "40209002", "nombre_generico": "AVENA", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "1000", "cantidad": "2", "total": "2000", "fecha": "2016-07-30"}, {"nombre": "HARINA DE TRIGO FARALLONES X LB", "codigo": "40201002", "nombre_generico": "HARINAS", "unidad": "LIBRA", "unidad_prefijo": "LB", "precio_unidad": "850", "cantidad": "2", "total": "1700", "fecha": "2016-07-30"}, {"nombre": "PAN TAJADO X 500 GRAMOS", "codigo": "40212001", "nombre_generico": "PAN", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "2700", "cantidad": "2", "total": "5400", "fecha": "2016-07-30"}]}, "CONDIMENTOS": {"nombre": "CONDIMENTOS", "alias": "CONDIMENTOS", "grupo_id": "9", "porcentaje_recomendado": "0", "porcentaje_compra": "0.42", "compra": [{"nombre": "SAL X LB", "codigo": "40800001", "nombre_generico": "SAL", "unidad": "LIBRA", "unidad_prefijo": "LB", "precio_unidad": "500", "cantidad": "2", "total": "1000", "fecha": "2016-07-30"}]}, "VEGETALES": {"nombre": "FRUTAS Y VERDURAS", "alias": "VEGETALES", "grupo_id": "5", "porcentaje_recomendado": "27", "porcentaje_compra": "1.72", "compra": [{"nombre": "CEBOLLA CABEZONA   X GR", "codigo": "40715004", "nombre_generico": "CEBOLLA CABEZONA", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "3", "cantidad": "990", "total": "2970", "fecha": "2016-07-30"}, {"nombre": "ZANAHORIA X GR", "codigo": "40703001", "nombre_generico": "ZANAHORIA", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "2", "cantidad": "550", "total": "1100", "fecha": "2016-07-30"}]}, "GRASAS": {"nombre": "GRASAS", "alias": "GRASAS", "grupo_id": "7", "porcentaje_recomendado": "2", "porcentaje_compra": "6.99", "compra": [{"nombre": "ACEITE 500ML VIVI", "codigo": "40401002", "nombre_generico": "ACEITE", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "2750", "cantidad": "6", "total": "16500", "fecha": "2016-07-30"}]}, "LECHELACTEOS": {"nombre": "LECHE Y OTROS PRODUCTOS LACTEOS", "alias": "LECHELACTEOS", "grupo_id": "3", "porcentaje_recomendado": "23", "porcentaje_compra": "14.15", "compra": [{"nombre": "KUMIS 1000 ALPINA", "codigo": "40506001", "nombre_generico": "KUMIS", "unidad": "LITRO", "unidad_prefijo": "L", "precio_unidad": "4900", "cantidad": "1", "total": "4900", "fecha": "2016-07-30"}, {"nombre": "LECHE EN POLVO * 380 RODEO", "codigo": "40507001", "nombre_generico": "LECHE EN POLVO", "unidad": "UNIDADES", "unidad_prefijo": "UN", "precio_unidad": "7900", "cantidad": "3", "total": "23700", "fecha": "2016-07-30"}, {"nombre": "QUESO CAMPESINO X GR", "codigo": "40501003", "nombre_generico": "QUESO", "unidad": "GRAMO", "unidad_prefijo": "GR", "precio_unidad": "9.6", "cantidad": "500", "total": "4800", "fecha": "2016-07-30"}]}}}}}}
        var consumoUltimoMes = getLast(getLast(tempObj.redencion));

        $scope.grupo = consumoUltimoMes.grupo[$routeParams.grupo];
        $scope.resumencompras = ngAudio.load("audios/compras-resumen-" + $scope.grupo.alias + ".mp3");
        $scope.compraIdeal = ngAudio.load("audios/compra-ideal.mp3");
        $scope.muyBien = ngAudio.load("audios/compras-muy-bien.mp3");
        $scope.grupo.porcentaje_visual = parseInt(calcularPorcentaje($scope.grupo.porcentaje_compra, $scope.grupo.porcentaje_recomendado));

        if (($scope.grupo.porcentaje_visual >= 90 && $scope.grupo.porcentaje_visual <= 110) & $scope.grupo.porcentaje_visual !== 100) {
            $scope.grupo.logro = true;

            //$scope.consumoUltimoMes = ordenarGrupos(getLast(getLast($scope.consumo)));
        } else {
            $scope.grupo.logro = false;
            var puntoVenta = {
                'pid': tempObj.punto_venta_id
            };
            ConsumoService.getProductosPuntoVenta(puntoVenta, function (response) {
                if (response.success) {
                    $scope.listaGrupo = response.data[$scope.grupo.grupo_id];
                    var i = 0;
                    var listaTemp = [];
                    var cantProductosLista = 3;
                    if ($scope.listaGrupo.productos.length < 3){
                        cantProductosLista = $scope.listaGrupo.productos.length;
                    }
                    
                    while (i < cantProductosLista) {
                        listaTemp.push($scope.listaGrupo.productos[i]);
                        i++;
                    }
                    $scope.listaGrupo = listaTemp;
                    console.log($scope.listaGrupo);
                } else {
                    console.log(response.message);
                }
            });

        }

        $scope.grupo.totalCompra = 0;
        for (var i in $scope.grupo.compra) {
            $scope.grupo.totalCompra = $scope.grupo.totalCompra + parseInt($scope.grupo.compra[i].total);
        }

  






        console.log($scope.grupo);


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
        ;

        function ordenarGrupos(myObj) {
            return(myObj);
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
        ;

        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */
    }]);