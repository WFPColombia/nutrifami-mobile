/*global angular*/
nutrifamiMobile.controller('PerfilController', ['$scope', '$rootScope', '$anchorScroll', 'PerfilService', 'bsLoadingOverlayService', '$timeout', '$route', function ($scope, $rootScope, $anchorScroll, PerfilService, bsLoadingOverlayService, $timeout, $route) {
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

        /* Cargamos la información del local storage*/
        $scope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.usuarioFamilia = JSON.parse(localStorage.getItem('usuarioFamilia'));

        console.log($scope.usuarioActivo);
        console.log($scope.usuarioFamilia);

        /* Creamos un arreglo para mostrar los miembros de la familia de forma dinamica */
        $scope.usuarioFamilia.miembrosPorRango = [
            {
                rango: '0 a 2 años',
                cantidad: parseInt($scope.usuarioActivo.rango_0a2),
                rango_alias: '0a2'
            },
            {
                rango: '2 a 5 años',
                cantidad: parseInt($scope.usuarioActivo.rango_2a5),
                rango_alias: '2a5'
            },
            {
                rango: '6 a 17 años',
                cantidad: parseInt($scope.usuarioActivo.rango_6a17),
                rango_alias: '6a17'
            },
            {
                rango: '18 a 60 años',
                cantidad: parseInt($scope.usuarioActivo.rango_18a60),
                rango_alias: '18a60'
            },
            {
                rango: '60 0 más años',
                cantidad: parseInt($scope.usuarioActivo.rango_60mas),
                rango_alias: '60mas'
            }
        ];

        $scope.usuarioFamilia.totalMiembrosPorInscribir = 0;
        for (var i in $scope.usuarioFamilia.miembrosPorRango) {
            $scope.usuarioFamilia.totalMiembrosPorInscribir = $scope.usuarioFamilia.totalMiembrosPorInscribir + $scope.usuarioFamilia.miembrosPorRango[i].cantidad;
        }

        $scope.familiar = {};
        $scope.familiar.FAM_PER_NOMBRE = '';
        $scope.familiar.FAM_PER_APELLIDO = '';
        $scope.familiar.parentescos = {
            availableOptions: [
                {id: 'hijo', name: 'Hijo'},
                {id: 'conyuge', name: 'Conyuge'},
                {id: 'padre', name: 'Padre'},
                {id: 'otros', name: 'Otros'}
            ]
        };

        $scope.usuarioFamilia.totalMiembrosInscritos = $scope.usuarioFamilia.length;

        $scope.abrirModalEditarFamiliar = function (index) {
            $scope.indexFamiliar = index;
            $rootScope.Ui.turnOn('editarFamiliar');
        };

        $scope.agregarFamiliar = function () {
            var index = $scope.indexFamiliar;
            console.log(index);
            var familiar = $scope.familiar;
            familiar.FAM_PER_PARENTESCO = familiar.parentescos.selectedOption.id;
            familiar.FAM_PER_JEFE = $scope.usuarioActivo.id;
            familiar.FAM_PER_CODIGO = $scope.usuarioActivo.login_codigo;
            familiar.documento_jefe = $scope.usuarioActivo.login_documento;
            familiar.FAM_PER_BIRTHDATE = "0";

            /* If para verificar si es usuario nuevo o miembro de la familia */
            if (typeof $scope.miembro === 'undefined') {
                familiar.rango = false;
                familiar.cantidad = 0;
            } else {
                familiar.rango = $scope.miembro.rango_alias;
                familiar.cantidad = $scope.miembro.cantidad - 1;
            }

            delete familiar["parentescos"];

            PerfilService.agregarFamiliar(familiar, function (response) {
                if (response.success) {
                    if (familiar.rango !== false) {
                        $scope.usuarioFamilia.miembrosPorRango[index].cantidad--;
                        $scope.usuarioActivo['rango_' + familiar.rango] = familiar.cantidad;
                    }

                    $scope.usuarioFamilia.push(familiar);

                    localStorage.setItem("usuarioActivo", JSON.stringify($scope.usuarioActivo));
                    localStorage.setItem("usuarioFamilia", JSON.stringify($scope.usuarioFamilia));
                    $rootScope.Ui.turnOff('editarFamiliar');
                } else {
                    console.log(response.message);
                }
            });
        };
        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */
    }]);