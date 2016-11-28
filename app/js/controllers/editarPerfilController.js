/*global angular*/
nutrifamiMobile.controller('EditarPerfilController', function($ionicPlatform, $scope, $location, $ionicLoading, $ionicPopup, UsuarioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.usuarioActivo.generos = {
            availableOptions: [
                { id: 'F', name: 'Femenino' },
                { id: 'M', name: 'Masculino' }
            ],
            selectedOption: { id: $scope.usuarioActivo.genero, name: $scope.usuarioActivo.genero }
        };
        $scope.usuarioActivo.etnias = {
            availableOptions: [
                { id: 'AFROCOLOMBIANOS', name: 'Afrocolombianos' },
                { id: 'INDIGENA', name: 'Indigenas' },
                { id: 'MESTIZO', name: 'Mestizo' },
                { id: 'OTROS', name: 'Otros' },
                { id: 'NINGUNO', name: 'Ninguno' }
            ],
            selectedOption: { id: $scope.usuarioActivo.etnia, name: $scope.usuarioActivo.etnia }
        };

        var nacimiento = $scope.usuarioActivo.birthdate;
        var n_ano = nacimiento.slice(0, 4);
        var n_mes = nacimiento.slice(5, 7) - 1;
        var n_dia = nacimiento.slice(8, 10);

        $scope.usuarioActivo.nacimiento = new Date(n_ano, n_mes, n_dia);

        $scope.update = function() {


            $scope.dataLoading = true;

            var usuarioActivo = Object.assign({}, $scope.usuarioActivo);

            usuarioActivo.genero = $scope.usuarioActivo.generos.selectedOption.id || '';
            usuarioActivo.etnia = $scope.usuarioActivo.etnias.selectedOption.id || '';
            var tempMonth = usuarioActivo.nacimiento.getMonth() + 1;
            var tempDay = usuarioActivo.nacimiento.getDate();

            if (tempMonth < 10) {
                tempMonth = "0" + tempMonth;
            }


            usuarioActivo.birthdate = usuarioActivo.nacimiento.getFullYear() + "-" + tempMonth + "-" + tempDay;

            delete usuarioActivo["generos"];
            delete usuarioActivo["etnias"];
            delete usuarioActivo["nacimiento"];

            // Oberlay Cargando mientras se guarda el avance
            $scope.loading = $ionicLoading.show({
                template: 'Guardando Cambios...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            UsuarioService.setUsuarioActivo(usuarioActivo, function(response) {
                if (response.success) {
                    $scope.mensaje = {
                        texto: "Los datos han sido guardado con éxito",
                    };
                    UsuarioService.setUsuarioActivo(usuarioActivo, function(response) {});
                } else {

                    $scope.mensaje = {
                        texto: "Ops!! Hubo un error y los datos no fueron guardados. Por favor intenta más tarde."

                    };
                }

                $ionicLoading.hide();
                $scope.dataLoading = false;

                var alertPopup = $ionicPopup.alert({
                    template: $scope.mensaje.texto
                });

            });

        };
    }, false);
});
