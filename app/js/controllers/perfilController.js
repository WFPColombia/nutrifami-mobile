/*global angular*/
nutrifamiMobile.controller('PerfilController', function ($ionicPlatform, $scope, $ionicPopup, $ionicLoading, PerfilService, UsuarioService) {
    'use strict';
    $ionicPlatform.ready(function () {

        /* Cargamos la información del local storage*/
        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.usuarioFamilia = UsuarioService.getUsuarioFamilia();

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
            console.log(index);
            $scope.indexFamiliar = index;
            $scope.miembro = $scope.usuarioFamilia.miembrosPorRango[index];
            $scope.popUpAgregarFamiliar = $ionicPopup.show({
                templateUrl: 'views/template/agregarFamiliar.tpl.html',
                scope: $scope,
                cssClass: 'agregar-familiar'
            });
        };

        $scope.agregarFamiliar = function () {

            $scope.loading = $ionicLoading.show({
                template: 'Guardando Familiar...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });
            var index = $scope.indexFamiliar;

            var familiar = $scope.familiar;
            familiar.FAM_PER_PARENTESCO = 'otros';
            familiar.FAM_PER_JEFE = $scope.usuarioActivo.id;
            familiar.FAM_PER_CODIGO = $scope.usuarioActivo.login_codigo;
            familiar.documento_jefe = $scope.usuarioActivo.login_documento;
            familiar.FAM_PER_BIRTHDATE = "0";

            console.log($scope.miembro);
            /* If para verificar si es usuario nuevo o miembro de la familia */


            if (typeof $scope.miembro === 'undefined') {
                familiar.rango = false;
                familiar.cantidad = 0;
            } else {
                familiar.rango = $scope.miembro.rango_alias;
                familiar.cantidad = $scope.miembro.cantidad - 1;
            }

            console.log(familiar);

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
                    $ionicLoading.hide();
                    $scope.popUpAgregarFamiliar.close();
                    var alertPopup = $ionicPopup.alert({
                        template: 'Familiar Guardado con éxito',
                        cssClass: 'confirmacion'
                    });


                } else {
                    console.log(response.message);
                }
            });
        };
    });
});